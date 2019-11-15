import crypto from 'crypto'
import { Request } from "express";
import UserRepository from '../user/repository'
import UserService from '../user/service'
import PasswordResetService from './service'
import PasswordResetRepository from './repository'
import { CustomError } from '../shared/models'
let moment = require('moment-timezone')

export default class {
  repository: PasswordResetRepository
  service: PasswordResetService
  userRepository: UserRepository
  userService: UserService
  constructor() {
    this.repository = new PasswordResetRepository()
    this.service = new PasswordResetService()
    this.userRepository = new UserRepository()
    this.userService = new UserService()
  }

  initiatePasswordReset(req: Request) {
    const email = req.body.email
    if (!email) {
      throw new CustomError(400, 'No email supplied for password reset')
    }

    const token = crypto.randomBytes(20).toString('hex')
    return this.userRepository.getUser(email).then(user => {
      if (!user) {
        throw new CustomError(404, 'No user found with email supplied.')
      }
      this.repository.initiatePasswordReset(email, token, moment.utc().add(30, 'minutes').format()).then(() => {
        this.service.sendPasswordResetEmail(email, token)
      })
    })
  }

  async resetPassword(req: Request) {
    const token = req.body.token
    const email = req.body.email
    const password = req.body.password

    if (!token) {
      throw new CustomError(400, 'Invalid password reset attempt')
    } else if (!email) {
      throw new CustomError(400, 'Invalid password reset attempt, no email provided')
    } else if (!password) {
      throw new CustomError(400, 'Invalid password reset attempt, no new password provided')
    }

    return this.repository.getEntry(email).then(async resetEntry => {
      if (!resetEntry) {
        throw new CustomError(400, 'Invalid password reset attempt')
      } if (resetEntry.isUsed) {
        throw new CustomError(400, 'Reset link has already been used.')
      } else if (token != resetEntry.token) {
        throw new CustomError(400, 'Invalid password reset attempt - incorrect token')
      } else if (moment(resetEntry.expiresAt).utc().isBefore(moment.utc())) {
        throw new CustomError(400, 'Password reset link has expired.')
      }

      return await this.userRepository.updatePassword(email, this.userService.hashPassword(password)).then(() => {
        this.repository.markEntryAsUsed(email)
      })
    })
  }
}