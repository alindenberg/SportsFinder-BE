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
    if (!userId) {
      throw Error("No user id supplied")
    }
    return this.repository.getUser(userId).then(user => {
      if (user == null) {
        throw new CustomError(404, `No user found for id ${userId}`)
      }
    })
  }

  updateUser(req: Request) {
    const user = this.service.createUser(req.params.userId, req.body, req.body.password)
    return this.repository.updateUser(user)
  }

  createUser(req: Request) {
    const user = this.service.createUser(uuidv4(), req.body)
    return this.repository.createUser(user).then(() => {
      return {
        id: user.id
      }
    })
  }

  deleteUser(req: Request) {
    return this.repository.deleteUser(req.params.userId)
  }
}