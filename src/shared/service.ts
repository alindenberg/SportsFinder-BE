import jwt from 'jsonwebtoken'
import { CustomErrorArray, CustomError } from "./models"
import { Response, Request, NextFunction } from "express"
import moment, { utc } from 'moment'

export function handle_error(res: Response, err: any) {
  if (err instanceof CustomError) {
    res.status(err.code).send(format_error_message(err.message))
  } else if (err instanceof CustomErrorArray) {
    res.status(err.code).send(format_error_array(err.errors))
  } else {
    res.status(400).send(format_error(err))
  }
}

function format_error(error: Error) {
  return {
    error: error.message
  }
}

function format_error_message(error: String) {
  return {
    error: error
  }
}

function format_error_array(errors: String[]) {
  return {
    errors: errors
  }
}

export function validateJwt(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token
  if (!token) {
    handle_error(res, new CustomError(401, 'No user logged in.'))
  } else {
    const decodedToken: any = jwt.verify(String(token), process.env.SECRET)
    if (moment(decodedToken.exp).utc().isBefore(moment().utc())) {
      handle_error(res, new CustomError(401, 'Session is expired'))
    } else {
      next()
    }
  }
}