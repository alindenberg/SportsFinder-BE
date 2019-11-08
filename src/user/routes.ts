import express from 'express'
import UserController from './controller'
import handle_error from '../shared/service'

const router = express.Router()
const controller = new UserController()

router.get('/users/:userId', async (req, res) => {
  try {
    await controller.getUser(req).then(user => {
      res.status(200).send(user)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.put('/users/:userId', async (req, res) => {
  try {
    await controller.updateUser(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.post('/users', async (req, res) => {
  try {
    await controller.createUser(req).then(() => {
      res.sendStatus(201)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.delete('/users/:userId', async (req, res) => {
  try {
    await controller.deleteUser(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.post('/login', async (req, res) => {
  try {
    await controller.login(req).then(token => {
      res.status(200).send({
        token: token
      })
    })
  } catch (err) {
    handle_error(res, err)
  }
})

export default router