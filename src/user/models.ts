export default class User {
  id: String
  email: String
  password: String
  username: String
  eventsCreated: String[]
  eventsAttended: String[]

  constructor(id: String, username: String, email: String, password: String, eventsCreated?: String[], eventsAttended?: String[]) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.eventsCreated = eventsCreated ? eventsCreated : []
    this.eventsAttended = eventsAttended ? eventsAttended : []
  }

  addEventCreated() {

  }

  addEventAttended() {

  }
}