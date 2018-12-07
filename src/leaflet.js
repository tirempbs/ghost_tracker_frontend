let nycMap
let allMarkers = []
let sightingPin

document.addEventListener('DOMContentLoaded', () => {


  //initialize map, set coordinates and zoom
  nycMap = L.map('nyc-map').setView([40.743, -74], 13);

  //add tile layer to map
  // L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  //   	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  //   	maxZoom: 16
  // }).addTo(nycMap);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  	subdomains: 'abcd',
  	maxZoom: 19
  }).addTo(nycMap)

  nycMap.on('click', onMapClick);

  //iterate through allSightings and create and render markers
  renderSightings = () => {
    allMarkers = []
    allSightings.forEach( s => {
      let newS = L.marker([parseFloat(s.lat), parseFloat(s.long)], {monsterId: s.monsterID, sightingId: s.id} ).addTo(nycMap).on('click', renderInfo);

      allMarkers.push(newS)

      newS.bindPopup(`
        <h3>${capitalizeName(s.entity)}</h3>
      `)
    })

  } //renderSightings

  const showAllButton = document.querySelector('#show-all')
  showAllButton.addEventListener('click', showAll)

  function onMarkerClick(event) {
    console.log(event.target);
  }


}) //DOMContentLoaded


function createFilterButtons() {
  const filterButtonDiv = document.querySelector('#filter-buttons')

  allMonsters.forEach((monster) => {
    const html = filterButtonRenderHTML(monster);
    filterButtonDiv.innerHTML += html
  })

  filterButtonDiv.addEventListener('click', monsterFilter)

}




//FILTER FUNCTIONS

function deleteMarkers() {
    allMarkers.forEach((marker) => {
      marker.remove();
    })
    console.log("DELETED ALL MARKERS");
}

function showAll() {
  deleteMarkers();
  allMarkers.forEach((marker) => {
    marker.addTo(nycMap);
  })
}

function monsterFilter(event) {
  deleteMarkers();
  filterSet = allMarkers.filter((marker) => {
  	return marker.options.monsterId === parseInt(event.target.id)
  })
  filterSet.forEach((marker) => {
    marker.addTo(nycMap);
  })
}

function filterButtonRenderHTML(monster) {
  return `
  <button type="button" name="button" id="${monster.id}">${monster.name}</button>`
}

// A few random functions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeName(string) {
  return string.split(' ').map(word => capitalize(word)).join(' ')
}

function centerLocation(latlng) {
  nycMap.setView(new L.LatLng(latlng[0], latlng[1]), 18);
  // nycMap.panTo(new L.LatLng(latlng[0], latlng[1]))
}

// ON CLICK FUNCTIONS //

//listener and callback for map click; lat and long can be retreived from this function
function onMapClick(event) {
  //event.latlng.lat = latitude as integer
  //event.latlng.lng = longitude as integer
  getEditCreateCoords(event)
  clearSightingInfo()
}

function getEditCreateCoords(event) {
  if (!document.getElementById('create-form').classList.contains('no-display')) {
    document.getElementById('create-coords').innerHTML = `${event.latlng.lat}<br>${event.latlng.lng}`
    removePulseRed(document.getElementById('create-coords-p'))
    addCreateEditPin(event)
  } else if (!document.getElementById('edit-form').classList.contains('no-display')) {
    document.getElementById('edit-coords').innerHTML = `${event.latlng.lat}<br>${event.latlng.lng}`
    removePulseRed(document.getElementById('edit-coords-p'))
    addCreateEditPin(event)
  }
}

function clearSightingInfo() {
  const sightingInfo = document.getElementById('sighting-info')
  if (sightingInfo.classList.contains('drop-in')) {
    toggleInvisible(document.getElementById('exit-show'))
    dropOut(sightingInfo)
  }
}

function addCreateEditPin(event) {
  removeCreateEditPin()
  sightingPin = L.marker([parseFloat(event.latlng.lat), parseFloat(event.latlng.lng)]).addTo(nycMap);
}

function removeCreateEditPin() {
  if (sightingPin) {sightingPin.remove()}
}

// SIDE BAR DISPLAY

function renderInfo(event) {
    let selectedSighting
    selectedSighting = allSightings.find((sighting) => {
      return sighting.id === event.target.options.sightingId
    })
    renderInfoSidebar(selectedSighting)
}

function renderInfoSidebar(selectedSighting) {
  removeCreateEditPin()
  const sideBar = document.querySelector('#sighting-info')
  sideBar.innerHTML = renderSidebar(selectedSighting)
  if (sideBar.classList.contains('no-display')) {
    dropIn(sideBar)
  }
  bindExitShow()
  bindDeleteShow()
  bindConfirmShow()
  dropOut(document.getElementById('create-form'))
  dropOut(document.getElementById('edit-form'))
  if (document.getElementById('open-create').classList.contains('no-display')) {
    toggleInvisible(document.getElementById('open-create'))
  }
}

function renderSidebar(sighting) {
  if (!sighting.confirmations) {sighting.confirmations = 666}
  return `<span id='exit-show' class='exit'>X</span><br>
  <h3>${capitalizeName(sighting.entity)}</h3>
  <img src=${sighting.image} width=300><br>
  <p>${sighting.description}</p>
  <p id='confirm-sighting' data-id=${sighting.id} data-confirms=${sighting.confirmations}>${sighting.confirmations} Confirmations</p>
  <p id='remove-sighting' data-id=${sighting.id}>Remove</p><br>
  <img style='height: 1em;' src='https://www.fileformat.info/info/unicode/char/26e7/inverted_pentagram.png'>
  `
}
