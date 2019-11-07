var moment = require('moment-timezone')
import Event, { Location } from './models'
import { CustomErrorArray } from '../shared/models'

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

    const event = new Event(
      id,
      requestBody.name,
      location,
      moment(requestBody.time).format("dddd, MMMM Do YYYY, h:mm a"),
      requestBody.description,
      requestBody.desiredNumOfParticipants,
      requestBody.creatorId,
      requestBody.attendees)

    const errors = this.validateEvent(event)
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }
    return event;
  }

  private validateEvent(event: Event): String[] {
    let errors: String[] = []
    if (!event.name || event.name.length < 6 || event.name.length > 40) {
      errors.push('Event must have a name between 6 and 40 characters.')
    }
    if (event.attendees.length > event.desiredNumOfParticipants) {
      errors.push('Number of attendees may not be greater than number of desired participants')
    }
    if (!event.creatorId) {
      errors.push('Event must have a creator associated with it')
    }
    if (!event.time || moment(event.time).diff(moment.now(), 'minutes') < 0) {
      errors.push('Event must have a start time in the future')
    }
    if (!event.location || !event.location.zipCode || !event.location.name) {
      errors.push('Event location must have a zip code and name.')
    }

    return errors
  }
}