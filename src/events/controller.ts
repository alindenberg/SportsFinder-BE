import uuidv4 from 'uuid/v4'
var moment = require('moment-timezone');
import EventRepository from './repository'
import Event, { Location } from './models'

export default class {
  repository: EventRepository

  constructor() {
    this.repository = new EventRepository()
  }

  createEvent(req: any): Promise<String> {
    const bodyLocation = req.body.location
    const location = new Location(
      bodyLocation.name,
      bodyLocation.zipCode,
      bodyLocation.streetAddress,
      bodyLocation.city,
      bodyLocation.state)

    const event = new Event(
      uuidv4().toString(),
      req.body.name,
      location,
      moment(req.body.time).format("dddd, MMMM Do YYYY, h:mm a"),
      req.body.description,
      req.body.desiredNumOfParticipants,
      req.body.attendees)

    return this.repository.createEvent(event).then(() => event.id)
  }

  getEvent(req: any): Promise<Event> {
    return this.repository.getEvent(req.params.eventId)
  }
}