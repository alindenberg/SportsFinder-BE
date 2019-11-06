import express from 'express'
import UserController from './controller'
import { format_error_response } from '../shared/service'

const router = express.Router()
const controller = new UserController()

router.get('/users/:userId', async (req, res) => {
  try {
    await controller.getUser(req).then(user => {
      res.status(200).send(user)
    })
  } catch (err) {
    res.status(400).send(format_error_response(err))
  }
})

router.post('/users', async (req, res) => {
  try {
    await controller.createUser(req).then((result) => {
      res.status(201).send(result)
    })
  } catch (err) {
    res.status(400).send(format_error_response(err))
  }
})

export default router