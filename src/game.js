let playerCoords

document.addEventListener('DOMContentLoaded', () => {

  //////////////////////////////////////////////////
  //MODAL

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

  //////////////////////////////////////////////////
  //KONG QUEST

  //quest - find three markers then monster encounter
  //start a quest prompt

  //clue 1 - marker (clue2) - marker (clue 3) - marker (clue 4) - Kong


  //clue 1 - KONG has escaped from a Broadway Theatre and is on the loose! He escaped from a Broadway theatre  (hidden marker)
  //clue 2 - KONG arrived on a ship from SKULL ISLAND and was taken to a performance on Broadway...
  //clue 3 - Hotel by the park...
  //clue 4 - KONG isn't far! Reveal KONG's location by typing the answer: "New York is known as the ______ state"
  //king kong (type ____ to defeat)


  const kongClue1 = L.marker([40.757, -73.986], { opacity: 0.0 }).addTo(nycMap);
  const kongClue2 = L.marker([40.689167, -74.044444], { opacity: 0.0 }).addTo(nycMap);
  const kongClue3 = L.marker([40.764712, -73.974574], { opacity: 0.0 }).addTo(nycMap);
  let kong
  const kongPlanes = L.marker([40.77725, -73.872611], { opacity: 0.0 }).addTo(nycMap);

  function kongEvent1() {
    kongClue1.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG has escaped BROADWAY! An attendee saw him escaping toward the bay... find a helicopter and HOVER over where the COPPER STATUE is to search for him!!`
    kongClue2.addEventListener('mouseover', kongEvent2)
  }

  function kongEvent2() {
    kongClue2.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG swam back to MANHATTAN in search of open space! He was last seen looking for a woman at a FAMOUS HOTEL near the park!`
    kongClue3.addEventListener('click', kongEvent3)
  }

  function kongEvent3() {
    kongClue3.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG has kidnapped a woman and escaped into MIDTOWN! An old man hints that KONG can be found by typing in the answer to the following: "New York is known as the ______ state."`
    document.addEventListener('keydown', kongEvent4)
  }

  let index = 0;

  function kongEvent4(event) {

    kong = L.marker([40.748433, -73.985656], { opacity: 0.0 }).addTo(nycMap);

    let selectedSighting = new Sighting({id: 99, entity: "king kong", lat: "40.748433", long: "-73.985656", image: "https://media.giphy.com/media/KRG6XGnCYB0L6/giphy.gif", description: "King of the concrete jungle. Search nearby airports for a way to defeat him!", monster: { id: 3, name: "Giant" } })

    const codes = ["e","m","p","i","r","e"];
    const key = event.key;

    if (key === codes[index]) {
      index++;
      console.log(key);

      if (index === codes.length) {
        kong.setOpacity(0.3)
        // .bindPopup(`<strong>You found KONG!</strong>`).openPopup();
        renderInfoSidebar(selectedSighting)
        kong.addEventListener('click', (event) => { renderInfoSidebar(selectedSighting) })
        kongPlanes.addEventListener('click', kongEvent5)

        index = 0;
      }
    } else {
      index = 0;
    }
  }

  function kongEvent5() {
    modal.style.display = "block";
    text.innerHTML = `<img src="http://images6.fanpop.com/image/photos/36900000/King-Kong-monster-movies-36994534-500-375.gif" /><p>The planes have been scrambled! Direct them to KONG to defeat him!</p>`
    kong.addEventListener('click', kongEvent6)
  }

  function kongEvent6() {
    modal.style.display = "block";
    text.innerHTML = `<img src="https://media.giphy.com/media/Cf7zUYpjrfPO0/giphy.gif" /><p>Oh no, it wasn't the airplanes. It was beauty killed the beast.</p>`
    kong.removeEventListener('click', kongEvent6)
  }

  //SECRET MARKERS

  const titanic = L.marker([40.741465, -74.010774], { opacity: 0.0 }).addTo(nycMap);

  titanic.addEventListener('click', (event) => {
    titanic.setOpacity(0.3).bindPopup(`<strong>You found a secret!</strong>`).openPopup();

    let selectedSighting = new Sighting({id: 100, entity: "titanic", lat: "40.741465", long: "-74.010774", image: "https://media.giphy.com/media/zO8ZqJV6inGko/giphy.gif", description: "Better late than never!", monster: { id: 1, name: "Ghost" } })

    renderInfoSidebar(selectedSighting)

    console.log("Hidden Marker Discovered!");
    //OPTIONAL: add to user "secrets found" collection list or array
  })

}) //DOMContentLoaded

const witchingPhrases = ['hocuspocus', 'suspiria', 'boiltoiltrouble']

const witchingString = witchingPhrases[Math.floor(Math.random() * witchingPhrases.length)]
console.log(witchingString)
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
    addSabbathScheme(document.querySelector('.information-area'))
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
