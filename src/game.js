document.addEventListener('DOMContentLoaded', () => {

  let kongDefeated = false

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
  btn.addEventListener('click', function(event) {
    modal.style.display = "block";
    if (kongDefeated === false) {
      text.innerHTML = "KING KONG is on the loose... search around TIMES SQUARE for clues as to his whereabouts..."
      kongClue1.addEventListener('click', kongEvent1)
    } else {
      text.innerHTML = "KING KONG has already been defeated."
    }
  })

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

  const kongClue1 = L.marker([40.757, -73.986], { opacity: 0.0 }).addTo(nycMap);
  const kongClue2 = L.marker([40.689167, -74.044444], { opacity: 0.0 }).addTo(nycMap);
  const kongClue3 = L.marker([40.764712, -73.974574], { opacity: 0.0 }).addTo(nycMap);
  let kong
  const kongPlanes = L.marker([40.77725, -73.872611], { opacity: 0.0 }).addTo(nycMap);

  function kongEvent1() {
    kongClue1.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG has escaped BROADWAY! An attendee saw him heading toward the bay... find a helicopter and HOVER over where the COPPER STATUE is to search for him!`
    kongClue2.addEventListener('mouseover', kongEvent2)
  }

  function kongEvent2() {
    kongClue2.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG swam back to MANHATTAN in search of open space! He was last seen looking for a woman in a hotel on the south end of CENTRAL PARK!`
    kongClue3.addEventListener('click', kongEvent3)
    kongClue1.remove()
  }

  function kongEvent3() {
    kongClue3.setOpacity(0.3)
    modal.style.display = "block";
    text.innerHTML = `KONG has kidnapped a woman and escaped into MIDTOWN! An old man hints that KONG can be found by typing in the answer to the following: "New York is known as the ______ state."`
    document.addEventListener('keydown', kongEvent4)
    kongClue2.remove()
  }

  let index = 0;

  function kongEvent4(event) {

    const codes = ["e","m","p","i","r","e"];
    const key = event.key;

    if (key === codes[index]) {
      index++;
      console.log(key);

      if (index === codes.length) {

        const giantClass = allMonsters.find(monster => monster.name === "Giant")

        kong = L.marker([40.748433, -73.985656], { opacity: 0.0, monsterId: giantClass.id }).addTo(nycMap);

        let selectedSighting = new Sighting({id: 99, entity: "king kong", lat: "40.748433", long: "-73.985656", image: "https://media.giphy.com/media/KRG6XGnCYB0L6/giphy.gif", description: "King of the concrete jungle. Search nearby airports for a way to defeat him!", monster: { id: giantClass.id, name: giantClass.name } })

        kong.setOpacity(0.3)
        if (!allMarkers.includes(kong)) { allMarkers.push(kong) }
        renderInfoSidebar(selectedSighting)
        kong.addEventListener('click', (event) => { renderInfoSidebar(selectedSighting) })
        kongPlanes.addEventListener('click', kongEvent5)
        kongClue3.remove()
        document.removeEventListener('keydown', kongEvent4)

        index = 0;
      }
    } else {
      index = 0;
    }
  }

  function kongEvent5() {
    modal.style.display = "block";
    text.innerHTML = `<img src="http://images6.fanpop.com/image/photos/36900000/King-Kong-monster-movies-36994534-500-375.gif" /><p>The airplanes are ready to attack! Direct them to KONG to defeat him!</p>`
    kong.removeEventListener('click')
    kong.addEventListener('click', kongEvent6)
  }

  function kongEvent6() {
    modal.style.display = "block";
    text.innerHTML = `<img src="https://media.giphy.com/media/Cf7zUYpjrfPO0/giphy.gif" /><p>Oh no, it wasn't the airplanes. T'was beauty killed the beast.</p>`
    kong.removeEventListener('click', kongEvent6)
    kongPlanes.remove()
    kong.remove()
    kongDefeated = true
  }

  //SECRET MARKERS

  const titanic = L.marker([40.741465, -74.010774], { opacity: 0.0, monsterId: 0, sightingId: 100 }).addTo(nycMap);

  titanic.addEventListener('click', (event) => {
    const ghostClass = allMonsters.find(monster => monster.name === "Ghost")
    titanic.options.monsterId = ghostClass.id
    if (!allMarkers.includes(titanic)) { allMarkers.push(titanic) }
    titanic.setOpacity(0.3).bindPopup(`<strong>You found a secret!</strong>`).openPopup();

    let selectedSighting = new Sighting({id: 100, entity: "titanic", lat: "40.741465", long: "-74.010774", image: "https://media.giphy.com/media/zO8ZqJV6inGko/giphy.gif", description: "Better late than never!", monster: { id: ghostClass.id, name: ghostClass.name } })

    renderInfoSidebar(selectedSighting)
  })

}) //DOMContentLoaded
