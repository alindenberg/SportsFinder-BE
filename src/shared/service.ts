import { CustomErrorArray, CustomError } from "./models"
import { Response } from "express"

export default function handle_error(res: Response, err: any) {
  if (err instanceof CustomError) {
    res.status(err.code).send(format_error_message(err.message))
  } else if (err instanceof CustomErrorArray) {
    res.status(err.code).send(format_error_array(err.errors))
  }
  res.status(400).send(format_error(err))
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