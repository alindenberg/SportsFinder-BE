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
    })
  }

  getUser(userId: String) {
    return this.userCollection.findOne({ id: userId }).catch(err => {
      throw Error(err)
    })
  }

  createUser(user: User) {
    return this.userCollection.insertOne(user).catch(err => {
      if (err.code == 11000) {
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
    })
  }

  deleteUser(userId: String) {
    return this.userCollection.deleteOne({ id: userId }).then((res) => {
      if (res.deletedCount != 1) {
        throw new CustomError(400, `Failed to delete user ${userId}`)
      }
    })
  }
}