const moment = require('moment-timezone')
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

  getEvents(zipCode: String) {
    let filter: any = {
      time: { '$gte': new Date(moment.utc().format()) }
    }
    if (zipCode) {
      filter['location.zipCode'] = zipCode
    }
    return this.collection.find(filter).toArray()
  }

  getUserEvents(userId: String, pastEvents: String) {
    let filter: any = {
      $or: [
        { 'attendees': userId },
        { 'creatorId': userId }
      ],
      time: { '$gte': new Date(moment.utc().format()) }
    }
    if (pastEvents === 'true') {
      console.log("Adding past events filter")
      filter['time'] = {
        '$lt': new Date(moment.utc().format())
      }
    }
    return this.collection.find(filter).toArray()
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

  postEventAttendees(eventId: String, attendees: string[]) {
    return this.collection.updateOne({ id: eventId }, {
      $set: { attendees: attendees }
    }).then(res => {
      if (res.matchedCount != 1) {
        throw new CustomError(404, `No event found for id ${eventId}`)
      }
    })
  }
}