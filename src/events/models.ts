export default class Event {
  id: String
  name: String
  location: Location
  time: String
  description: String
  desiredNumOfParticipants: Number
  creatorId: String
  attendees: String[]

  constructor(
    id: String,
    name: String,
    location: Location,
    time: String,
    description: String,
    desiredNumOfParticipants: Number,
    creatorId: String,
    attendees: String[]) {
    this.id = id
    this.name = name
    this.location = location
    this.time = time
    this.description = description
    this.desiredNumOfParticipants = desiredNumOfParticipants
    this.creatorId = creatorId
    this.attendees = attendees
  }
}

export class Location {
  name: String
  zipCode: String
  streetAddress: String
  city: String
  state: String

  constructor(name: String, zipCode: String, streetAddress: String, city: String, state: String) {
    this.name = name
    this.zipCode = zipCode
    this.streetAddress = streetAddress
    this.city = city
    this.state = state
  }
}