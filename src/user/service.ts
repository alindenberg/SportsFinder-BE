import crypto from 'crypto'
import User from './models'
import jwt from 'jsonwebtoken'
import { CustomErrorArray } from '../shared/models'
import * as emailValidator from 'email-validator'
const moment = require('moment-timezone')

export default class {
  constructor() { }

  createUser(id: String, reqBody: any, password?: String): User {
    const user = new User(
      id,
      reqBody.username,
      reqBody.email,
      password ? password : this.hashPassword(reqBody.password)
    )

    const errors = this.validateUser(user)
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }

    return user
  }

  hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest("base64")
  }

  generateJwt(userId: string) {
    return jwt.sign({ exp: moment.utc().add(1, 'hour').valueOf(), id: userId }, process.env.SECRET)
  }

  private validateUser(user: User): String[] {
    let errors = []
    if (user.username.length < 6 || user.username.length > 20) {
      errors.push("Username must be between 6 and 20 characters")
    }
    if (!emailValidator.validate(user.email.toString())) {
      errors.push('Invalid email supplied')
    }
    return errors
  }
}