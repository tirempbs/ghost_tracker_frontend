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

function createNewSighting() {
  const createForm = document.getElementById('create-form')
  const nEntity = createForm.querySelector('input[name=entity]')
  const nImage = createForm.querySelector('input[name=image_url]')
  const nDescription = createForm.querySelector('textarea[name=description]')
  const nBody = {sighting: {entity: nEntity, image: nImage, description: nDescription}}
  fetch('http://localhost:3000/api/v1/sightings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(nBody)
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    if (res.id) {
      const nSighting = new Sighting(res)
      console.log(nSighting)
    }
  })
}
