let playerCoords

document.addEventListener('DOMContentLoaded', () => {

  //modal functions

  // Get the modal
  const modal = document.getElementById('myModal');

  // Get the button that opens the modal
  const btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  const text = document.getElementById('modal-text');

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
    text.innerHTML = "KING KONG is on the loose... search around TIMES SQUARE for clues as to his whereabouts..."
    kongClue1.addEventListener('click', kongEvent1)
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  /////////////////////////////////////////////////////////

  //quest - find three markers then monster encounter
  //start a quest prompt

  //clue 1 - marker (clue2) - marker (clue 3) - marker (clue 4) - Kong


  //clue 1 - KONG has escaped from a Broadway Theatre and is on the loose! He escaped from a Broadway theatre  (hidden marker)
  //clue 2 - KONG arrived on a ship from SKULL ISLAND and was taken to a performance on Broadway...
  //clue 3 - Hotel by the park...
  //clue 4 - KONG isn't far! Reveal KONG's location by typing the answer: "New York is known as the ______ state"
  //king kong (type ____ to defeat)


  const kongClue1 = L.marker([40.757, -73.986], { opacity: 0.0 }).addTo(nycMap);

  function kongEvent1() {
    kongClue1.setOpacity(0.3)

    const sideBar = document.querySelector('#sighting-info')
    sideBar.innerHTML = `YOU FOUND THE FIRST CLUE`

    modal.style.display = "block";
    text.innerHTML = "CLUE 1"
  }

  //secret markers

  const titanic = L.marker([40.741465, -74.010774], { opacity: 0.0 }).addTo(nycMap);

  titanic.addEventListener('click', (event) => {
    titanic.setOpacity(0.3).bindPopup(`<strong>You found a secret!</strong>`).openPopup();

    const sideBar = document.querySelector('#sighting-info')
    sideBar.innerHTML = `<p>The TITANIC has arrived at last!</p> <img src="https://media.giphy.com/media/zO8ZqJV6inGko/giphy.gif" />`


    console.log("Hidden Marker Discovered!");
    //OPTIONAL: add to user "secrets found" collection list or array
  })

}) //DOMContentLoaded

const witchingString = 'suspiria'
let witchingArray = []

function bindWitchingHour() {
  document.addEventListener('keyup', (event) => {
    const keyName = event.key
    if (witchingString[witchingArray.length] == keyName) {
      witchingArray.push(keyName)
      witchingHour()
    } else {
      witchingArray = []
    }
  })
}

function witchingHour() {
  if (witchingArray.length === witchingString.length) {
    centerLocation(playerCoords)
    renderInfoSidebar({entity: '', image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/the-three-witches-terry-fleckney.jpg', description: 'We see you', id: 666})
  }
}

function getLocation() {
  if (navigator.geolocation) {
    console.log("mapping coords")
    navigator.geolocation.getCurrentPosition((position) => {
      playerCoords = [position.coords.latitude, position.coords.longitude]
    })
  }
}

getLocation()
