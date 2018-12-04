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

function fetchSightings() {
  return fetch('http://localhost:3000/api/v1/sightings')
  .then(res => res.json())
}

function loadAllSightings() {
  fetchSightings().then(sightings => {
    sightings.forEach((sighting) => {
      new Sighting(sighting)
    })
    console.log(`%cLoaded ${sightings.length} sightings`, 'color: green')
  })
}
