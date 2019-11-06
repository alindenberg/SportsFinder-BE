var moment = require('moment-timezone')
import Event, { Location } from './models'

export default class {
  constructor() { }

  createEvent(id: String, requestBody: any): Event {
    const bodyLocation = requestBody.location
    const location = new Location(
      bodyLocation.name,
      bodyLocation.zipCode,
      bodyLocation.streetAddress,
      bodyLocation.city,
      bodyLocation.state)

    return new Event(
      id,
      requestBody.name,
      location,
      moment(requestBody.time).format("dddd, MMMM Do YYYY, h:mm a"),
      requestBody.description,
      requestBody.desiredNumOfParticipants,
      requestBody.attendees)
  }
}