export default class User {
  id: String
  email: String
  password: String
  username: String
  zipCode: Number

  constructor(id: String, username: String, email: String, password: String, zipCode: Number) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.zipCode = zipCode
  }
}