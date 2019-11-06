import express from 'express'
import EventsController from './controller'
import { format_error, format_error_message } from '../shared/service'
import { CustomError } from '../shared/models'

const router = express.Router()
const controller = new EventsController()

router.post('/events', async (req, res) => {
  try {
    await controller.createEvent(req).then(eventId => {
      res.status(201).send({ id: eventId })
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

router.get('/events/:eventId', async (req, res) => {
  try {
    await controller.getEvent(req).then(event => {
      res.status(200).send(event)
    })
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).send(format_error_message(err.message))
    }
    res.status(400).send(format_error(err))
  }
})

router.put('/events/:eventId', async (req, res) => {
  try {
    await controller.updateEvent(req).then((foundEvent) => {
      res.sendStatus(200)
    })
  } catch (err) {
    if (err instanceof CustomError) {
      res.status(err.code).send(format_error_message(err.message))
    }
    res.status(400).send(format_error(err))
  }
})

export default router