class Sighting {
  constructor(body) {
    this.id = body.id
    this.entity = body.entity
    this.lat = body.lat
    this.long = body.long
    this.image = body.image
    this.description = body.description
    this.userID = body.user.id
    allSightings.push(this)
  }
}

let allSightings = []
