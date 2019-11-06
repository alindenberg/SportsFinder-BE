import crypto from 'crypto'
import uuidv4 from 'uuid/v4'
import User from './models'
import UserRepository from './repository'
import { CustomError } from '../shared/models'

export default class {
  repository: UserRepository
  constructor() {
    this.repository = new UserRepository()
  }

  getUser(req: any) {
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

  createUser(req: any) {
    if (req.body.username.length < 6 || req.body.username.length > 18) {
      throw Error("Username must be between 6 and 18 characters")
    }
    const user = new User(
      uuidv4().toString(),
      req.body.username,
      req.body.email,
      crypto.createHash('sha256').update(req.body.password).digest("base64")
    )
    return this.repository.createUser(user).then(() => {
      return {
        id: user.id
      }
    })
  }

  deleteUser(req: any) {
    return this.repository.deleteUser(req.params.userId)
  }
}