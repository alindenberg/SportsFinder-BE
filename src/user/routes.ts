import express from 'express'
import UserController from './controller'
import { format_error, format_error_message } from '../shared/service'

const router = express.Router()
const controller = new UserController()

router.get('/users/:userId', async (req, res) => {
  try {
    await controller.getUser(req).then(user => {
      if (user == null) {
        res.status(404).send(format_error_message('No user found for given id'))
      }
      res.status(200).send(user)
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

router.post('/users', async (req, res) => {
  try {
    await controller.createUser(req).then((result) => {
      res.status(201).send(result)
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

router.delete('/users/:userId', async (req, res) => {
  try {
    await controller.deleteUser(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    res.status(400).send(format_error(err))
  }
})

export default router