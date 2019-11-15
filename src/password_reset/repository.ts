import { initDb, getCollection } from '../database'
import { Collection } from 'mongodb'
export default class {
  collection: Collection
  constructor() {
    initDb().then(() => {
      this.collection = getCollection('password_reset')
      this.collection.createIndex('email', { unique: true })
    })
  }

  initiatePasswordReset(email: string, token: string, expiresAt: string) {
    const doc = {
      email,
      token,
      expiresAt,
      isUsed: false
    }
    return this.collection.replaceOne({ email: email }, doc, { upsert: true })
  }

  getEntry(email: string) {
    return this.collection.findOne({ email: email })
  }

  markEntryAsUsed(email: string) {
    return this.collection.updateOne({ email: email }, { $set: { isUsed: true } })
  }
}