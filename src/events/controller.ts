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

  deleteEvent(req: any): Promise<void> {
    return this.repository.deleteEvent(req.params.eventId)
  }

  addEventAttendee(req: any): Promise<void> {
    if (!req.body || !req.body.userId) {
      throw new CustomError(400, 'No user id supplied to add to event')
    }
    return this.repository.addEventAttendee(req.params.eventId, req.body.userId)
  }

  removeEventAttendee(req: any): Promise<void> {
    return this.repository.removeEventAttendee(req.params.eventId, req.params.userId)
  }
}