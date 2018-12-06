let nycMap
let allMarkers = []

document.addEventListener('DOMContentLoaded', () => {


  //initialize map, set coordinates and zoom
  nycMap = L.map('nyc-map').setView([40.743, -74], 13);

  //add tile layer to map
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    	maxZoom: 16
  }).addTo(nycMap);

  //listener and callback for map click; lat and long can be retreived from this function
  function onMapClick(event) {
    console.log("You clicked the map at " + event.latlng);
    //event.latlng.lat = latitude as integer
    //event.latlng.lng = longitude as integer

    if (!document.getElementById('create-form').classList.contains('no-display')) {
      document.getElementById('create-coords').innerHTML = `${event.latlng.lat}<br>${event.latlng.lng}`
    } else if (!document.getElementById('edit-form').classList.contains('no-display')) {
      document.getElementById('edit-coords').innerHTML = `${event.latlng.lat}<br>${event.latlng.lng}`
    }
  }

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


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeName(string) {
  return string.split(' ').map(word => capitalize(word)).join(' ')
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

//

function renderInfo(event) {
    let selectedSighting
    const sideBar = document.querySelector('#sighting-info')
    console.log(event.target.options.sightingId);

    selectedSighting = allSightings.find((sighting) => {
      return sighting.id === event.target.options.sightingId
    })

    sideBar.innerHTML = renderSidebar(selectedSighting)
    // sideBar.innerHTML = "TEST"
}

function renderSidebar(sighting) {
  return `
  <h3>${capitalizeName(sighting.entity)}</h3>
  <img src=${sighting.image} width=300><br>
  ${sighting.description}
  `
}

//
