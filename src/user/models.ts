export default class User {
  id: String
  email: String
  password: String
  username: String
  zipCode: String

  constructor(id: String, username: String, email: String, password: String, zipCode: String) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.zipCode = zipCode
  }
}