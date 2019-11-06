export class CustomError {
  code: number
  message: String

  constructor(code: number, message: String) {
    this.code = code
    this.message = message
  }
}

export class CustomErrorArray {
  code: number
  errors: String[]

  constructor(code: number, errors: String[]) {
    this.code = code
    this.errors = errors
  }
}