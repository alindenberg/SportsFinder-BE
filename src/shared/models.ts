export class CustomError {
  code: number
  message: String

  constructor(code: number, message: String) {
    this.code = code
    this.message = message
  }
}