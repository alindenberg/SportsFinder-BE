import uuidv4 from 'uuid/v4'
import UserService from './service'
import UserRepository from './repository'
import { CustomError } from '../shared/models'
import { Request } from 'express'

export default class {
  repository: UserRepository
  service: UserService
  constructor() {
    this.repository = new UserRepository()
    this.service = new UserService()
  }

  getUser(req: Request) {
    const userId = req.params.userId;
    return this.repository.getUser(userId).then(user => {
      if (user == null) {
        throw new CustomError(404, `No user found for id ${userId}`)
      }
      return user
    })
  }

  updateUser(req: Request) {
    return this.repository.getUser(req.params.userId).then((user) => {
      this.service.createUser(user.userId, req.body, user.password)
      return this.repository.updateUser(user)
    })
  }

  createUser(req: Request) {
    const user = this.service.createUser(uuidv4(), req.body)
    return this.repository.createUser(user)
  }

  deleteUser(req: Request) {
    return this.repository.deleteUser(req.params.userId)
  }

  login(req: Request) {
    return this.repository.login(
      req.body.email,
      this.service.hashPassword(req.body.password)
    ).then((userId) => {
      return this.service.generateJwt(userId)
    })
  }
}