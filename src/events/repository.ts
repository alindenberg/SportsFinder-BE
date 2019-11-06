import { Collection } from 'mongodb'
import { initDb, getCollection } from '../database'
import Event from './models'
export default class EventRepository {
  collection: Collection

  constructor() {
    initDb().then(() => {
      this.collection = getCollection('events')
    })
  }

  createEvent(event: Event) {
    return this.collection.insertOne(event)
  }

  getEvent(eventId: String) {
    return this.collection.findOne({ id: eventId }).catch(err => {
      throw Error(err)
    })
  }

  updateEvent(event: Event): Promise<boolean> {
    return this.collection.replaceOne({ id: event.id }, event).then((result) => result.matchedCount == 1)
  }
}