import uuidv4 from 'uuid/v4'
import EventService from './service'
import Event, { Location } from './models'
import EventRepository from './repository'

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
}