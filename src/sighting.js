class Sighting {
  constructor(body) {
    this.id = body.id
    this.entity = body.entity
    this.lat = body.lat
    this.long = body.long
    this.image = body.image
    this.description = body.description
    this.monsterID = body.monster.id
    allSightings.push(this)
  }
}

let allSightings = []

function fetchSightings() {
  return fetch('http://localhost:3000/api/v1/sightings')
  .then(res => res.json())
}

function loadAllSightings() {
  allSightings = []
  return fetchSightings().then(sightings => {
    sightings.forEach((sighting) => {
      new Sighting(sighting)
    })
    console.log(`%cLoaded ${sightings.length} sightings`, 'color: green')
  })
}

function searchGiphy(string) {
  fetch(`http://api.giphy.com/v1/gifs/search?q=${string}&api_key=3z8UvhNbY64J20z8qW6UICnAvJQgEZbI&limit=5`)
    .then(resp => resp.json())
    .then(json => {
      imgArray = []
      json.data.forEach(img => {
        imgArray.push(img.images.original.url)
      })
      console.log(json)
      const searchDisplay = document.getElementById('giphy-display')
      imgArray.forEach(img => {
        searchDisplay.innerHTML += `
          <img src=${img} width=290><br>
        `
      }) 
    })
}


function createNewSighting() {
  const createForm = document.getElementById('create-form')
  const nEntity = createForm.querySelector('input[name=entity]').value
  const nImage = createForm.querySelector('input[name=image-url]').value
  const nDescription = createForm.querySelector('textarea[name=description]').value
  const nLat = document.getElementById('create-coords').innerHTML.split('<br>')[0]
  const nLong = document.getElementById('create-coords').innerHTML.split('<br>')[1]
  const nMonsterId = createForm.querySelector('select').value

  if (nEntity && nImage && nDescription && nLat && nLong && nMonsterId) {
    const nBody = {sighting: {entity: nEntity, image: nImage, description: nDescription, lat: nLat, long: nLong, monster_id: nMonsterId}}
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
        loadAllSightings()
        .then(() => {
          deleteMarkers()
          renderSightings()
          resetCreate()
          renderInfoSidebar(res)
        })

      }
    })
  } else {
    toggleInvisible(document.getElementById('open-create'))
    setTimeout(() => {
      dropIn(createForm)
      alert('You must fill out all forms!')
    },1050)
  }
}

function deleteSightingFromShow(event) {
  const sightingId = parseInt(event.target.dataset.id)
  dropOut(document.getElementById('sighting-info'))
  document.getElementById('sighting-info').innerHTML = ''
  fetch(`http://localhost:3000/api/v1/sightings/${sightingId}`, {
    method: 'DELETE',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)

    loadAllSightings().then(() => {
      deleteMarkers()
      renderSightings()
    })
  })
}
