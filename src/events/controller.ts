import uuidv4 from 'uuid/v4'
import EventService from './service'
import Event from './models'
import EventRepository from './repository'
import { CustomError } from '../shared/models'

export default class {
  repository: EventRepository
  service: EventService

  constructor() {
    this.repository = new EventRepository()
    this.service = new EventService()
  }

  createEvent(req: any): Promise<String> {
    const event = this.service.createEvent(uuidv4(), req.body)
    return this.repository.createEvent(event).then(() => event.id)
  }

  async updateEvent(req: any): Promise<void> {
    const event = this.service.createEvent(req.params.eventId, req.body)
    return this.repository.updateEvent(event)
  }

  getEvent(req: any): Promise<Event> {
    return this.repository.getEvent(req.params.eventId)
  }

  getEvents(req: any): Promise<Event[]> {
    if (req.query.userId) {
      return this.repository.getUserEvents(req.query.userId)
    }
    //TODO - logic to get surrounding zip codes for wider search
    return this.repository.getEvents(req.query.zipCode)
  }

  deleteEvent(req: any): Promise<void> {
    return this.repository.deleteEvent(req.params.eventId)
  }

  postEventAttendees(req: any): Promise<void> {
    if (!req.body) {
      throw new CustomError(400, 'No user ids supplied to add to event')
    }
    this.service.validateAttendees(req.body.attendees)
    return this.repository.postEventAttendees(req.params.eventId, req.body.attendees)
  }
}