export function format_error(error: Error) {
  return {
    error: error.message
  }
}

export function format_error_message(error: String) {
  return {
    error: error
  }
}