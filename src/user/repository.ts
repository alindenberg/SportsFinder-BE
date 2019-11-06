import { getCollection, initDb } from "../database"
import { Collection } from 'mongodb'
import User from "./models"

export default class {
  userCollection: Collection
  constructor() {
    initDb().then(() => {
      this.userCollection = getCollection('user')
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
}