import Event from './models'
import { Collection } from 'mongodb'
import { CustomError } from '../shared/models'
import { initDb, getCollection } from '../database'

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
    return this.collection.findOne({ id: eventId }).then(event => {
      if (!event) {
        throw new CustomError(404, `Couldn't find event with id ${eventId}`)
      }
      return event
    })
  }

  updateEvent(event: Event): Promise<void> {
    return this.collection.replaceOne({ id: event.id }, event).then((result) => {
      if (result.matchedCount != 1) {
        throw new CustomError(404, `Couldn't find event with id ${event.id}`)
      }
    })
  }
}