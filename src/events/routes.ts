import express from 'express'
import EventsController from './controller'
import { handle_error, validateJwt } from '../shared/service'

const router = express.Router()
const controller = new EventsController()

router.post('/events', validateJwt, validateJwt, async (req, res) => {
  try {
    await controller.createEvent(req).then(eventId => {
      res.status(201).send({ id: eventId })
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.get('/events', validateJwt, async (req, res) => {
  try {
    await controller.getEvents(req).then(events => {
      res.status(200).send(events)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.get('/events/:eventId', validateJwt, async (req, res) => {
  try {
    await controller.getEvent(req).then(event => {
      res.status(200).send(event)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.put('/events/:eventId', validateJwt, async (req, res) => {
  try {
    await controller.updateEvent(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.delete('/events/:eventId', validateJwt, async (req, res) => {
  try {
    await controller.deleteEvent(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.post('/events/:eventId/attendees', validateJwt, async (req, res) => {
  try {
    await controller.postEventAttendees(req).then(() => {
      res.sendStatus(201)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

export default router