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

    let errors = this.validateLocation(location)
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }

    const event = new Event(
      id,
      requestBody.name,
      location,
      new Date(requestBody.time),
      requestBody.description,
      requestBody.desiredNumOfParticipants,
      requestBody.creatorId,
      requestBody.attendees)

    errors = this.validateEvent(event)
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }
    return event;
  }

  validateAttendees(attendees: string[]) {
    //validate uuid format of attendees
    let errors: string[] = []
    for (let i = 0; i < attendees.length; i++) {
      if (!(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).test(attendees[i])) {
        errors.push(`${attendees[i]} is not a valid uuid`)
      }
    }
    if (errors.length > 0) {
      throw new CustomErrorArray(400, errors)
    }
  }

  private validateEvent(event: Event) {
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
    if (!event.time || moment(event.time).utc().diff(moment.utc(), 'minutes') < 60) {
      errors.push('Event must have a start time  at least 1 hour from now.')
    }

    return errors
  }

  private validateLocation(location: Location): String[] {
    let errors = []
    if (!location.zipCode || !location.name) {
      errors.push('Event location must have a zip code and name.')
    }

    return errors
  }
}