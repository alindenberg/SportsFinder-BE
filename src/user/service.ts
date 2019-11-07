import crypto from 'crypto'
import User from './models'
import { CustomErrorArray } from '../shared/models'
import * as emailValidator from 'email-validator'

export default class {
  constructor() {

  }

  createUser(id: String, reqBody: any, password?: String): User {
    const user = new User(
      id,
      reqBody.username,
      reqBody.email,
      password ? password : crypto.createHash('sha256').update(reqBody.password).digest("base64")
    )

    const errors = this.validateUser(user)
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }

    return user
  }

  private validateUser(user: User): String[] {
    let errors = []
    if (user.username.length < 6 || user.username.length > 18) {
      errors.push("Username must be between 6 and 18 characters")
    }
    if (!emailValidator.validate(user.email.toString())) {
      errors.push('Invalid email supplied')
    }
    return errors
  }
}