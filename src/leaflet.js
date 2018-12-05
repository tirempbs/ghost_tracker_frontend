let nycMap
const allMarkers = []

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

  //iterate through allSightings and create and render pins
  renderSightings = () => {
    allSightings.forEach( s => {
      let newS = L.marker([parseFloat(s.lat), parseFloat(s.long)], {monsterId: s.monsterID, sightingId: s.id} ).addTo(nycMap);

      allMarkers.push(newS)

      newS.bindPopup(`
        <h3>${capitalizeName(s.entity)}</h3>
        <img src=${s.image} width=300>
        ${s.description}
      `)
    })
  }

  const showAllButton = document.querySelector('#show-all')
  showAllButton.addEventListener('click', showAll)

})

function createFilterButtons() {
  const filterButtonDiv = document.querySelector('#filter-buttons')

  allMonsters.forEach((monster) => {
    const html = filterButtonRenderHTML(monster);
    filterButtonDiv.innerHTML += html
  })

  filterButtonDiv.addEventListener('click', monsterFilter)

} //DOMContentLoaded


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
  <button type="button" name="button" id="${monster.id}">${monster.name}</button>
  `
}

//
