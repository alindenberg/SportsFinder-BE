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

  getEvents(zipCodes: Number[]) {
    return this.collection.find({ 'location.zipCode': { $in: zipCodes } }).toArray()
  }

  updateEvent(event: Event): Promise<void> {
    return this.collection.replaceOne({ id: event.id }, event).then((result) => {
      if (result.matchedCount != 1) {
        throw new CustomError(404, `Couldn't find event with id ${event.id}`)
      }
    })
  }

  deleteEvent(eventId: String): Promise<void> {
    return this.collection.deleteOne({ id: eventId }).then(res => {
      if (res.deletedCount != 1) {
        throw new CustomError(404, `Could not find event to delete with id: ${eventId}`)
      }
    })
  }

  addEventAttendee(eventId: String, userId: String) {
    return this.collection.updateOne({ id: eventId }, {
      $addToSet: {
        'attendees': userId
      }
    }).then(res => {
      if (res.matchedCount != 1) {
        throw new CustomError(404, `No event found for id ${eventId}`)
      }
    })
  }

  removeEventAttendee(eventId: String, userId: String) {
    return this.collection.updateOne({ id: eventId }, {
      $pull: {
        'attendees': userId
      }
    }).then(res => {
      if (res.matchedCount != 1) {
        throw new CustomError(404, `No event found for id ${eventId}`)
      }
      if (res.modifiedCount != 1) {
        throw new CustomError(400, `User ${userId} was not attending event ${eventId}`)
      }
    })
  }
}