import User from "./models"
import { Collection } from 'mongodb'
import { CustomError } from "../shared/models"
import { getCollection, initDb } from "../database"

export default class {
  userCollection: Collection
  constructor() {
    initDb().then(() => {
      this.userCollection = getCollection('users')
      this.userCollection.createIndex('username', { unique: true })
      this.userCollection.createIndex('email', { unique: true })
    })
  }

  getUser(userId: String) {
    return this.userCollection.findOne({ $or: [{ id: userId }, { email: userId }] }).catch(err => {
      throw Error(err)
    })
  }

  createUser(user: User) {
    return this.userCollection.insertOne(user).catch(err => {
      if (err.code == 11000) {
        if (err.errmsg.includes('email')) {
          throw Error('Account with email already exists.')
        }
        throw Error('Username is already taken.')
      }
      throw Error(err)
    })
  }

  updateUser(user: User) {
    return this.userCollection.replaceOne({ id: user.id }, user).then(res => {
      if (res.matchedCount != 1) {
        throw new CustomError(400, `Couldn't find user ${user.id} to update`)
      } else if (res.modifiedCount != 1) {
        throw new CustomError(400, `Matched but failed to update user ${user.id}`)
      }
    }).catch(err => {
      if (err.code == 11000) {
        if (err.errmsg.includes('email')) {
          throw Error('Account with email already exists.')
        }
        throw Error('Username is already taken.')
      }
      throw Error(err)
    })
  }

  deleteUser(userId: String) {
    return this.userCollection.deleteOne({ id: userId }).then((res) => {
      if (res.deletedCount != 1) {
        throw new CustomError(400, `Failed to delete user ${userId}`)
      }
    })
  }

  login(email: string, password: string) {
    return this.userCollection.findOne({ email: email }).then(user => {
      if (!user || user.password != password) {
        throw new CustomError(404, 'Incorrect email or password.')
      }
      return user.id
    })
  }

  updatePassword(email: string, password: string) {
    return this.userCollection.updateOne({ email: email }, { $set: { password: password } }).then(res => {
      if (res.matchedCount == 0) {
        throw new CustomError(404, 'Did not find user with email to update password for.')
      }
    })
  }
}