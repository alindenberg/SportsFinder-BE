import { Router } from "express";
import { handle_error, validateJwt } from '../shared/service'
import PasswordResetController from './controller'

const router = Router()
const controller = new PasswordResetController()

router.post('/initiatePasswordReset', validateJwt, async (req, res) => {
  try {
    await controller.initiatePasswordReset(req).then(() => {
      res.sendStatus(200)
    })
  } catch (err) {
    handle_error(res, err)
  }
})

router.post('/password', async (req, res) => {
  try {
    await controller.resetPassword(req).then(() => {
      res.sendStatus(201)
    })
  } catch (err) {
    handle_error(res, err)
  }
})
export default router