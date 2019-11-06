import express from 'express'
import EventsController from './controller'
import { format_error, format_error_message } from '../shared/service'

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
      if (event == null) {
        res.status(404).send(format_error_message('No event found for given id'))
      }
      res.status(200).send(event)
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

router.put('/events/:eventId', async (req, res) => {
  try {
    await controller.updateEvent(req).then((foundEvent) => {
      if (!foundEvent) {
        res.status(404).send(format_error_message(`Didn't find event with id ${req.params.eventId} to update.`))
      }
      res.sendStatus(200)
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

export default router