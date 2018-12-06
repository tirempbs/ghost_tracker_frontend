function bindCreateButton() {
  document.getElementById('open-create').addEventListener('click', (event) => {
    toggleInvisible(event.target)
    dropOut(document.getElementById('edit-form'))
    dropOut(document.getElementById('sighting-info'))
    dropIn(document.getElementById('create-form'))
  })
}

function bindSubmitButtonCreate() {
  document.getElementById('create-form').addEventListener('submit', (event) => {
    event.preventDefault()
    createNewSighting()
    dropOut(event.target)
    toggleInvisible(document.getElementById('open-create'))
  })
}

function bindExitCreate() {
  document.getElementById('exit-create').addEventListener('click', (event) => {
    dropOut(event.target.parentNode.parentNode)
    toggleInvisible(document.getElementById('open-create'))
    resetCreate()
  })
}

function bindExitEdit() {
  document.getElementById('exit-edit').addEventListener('click', (event) => {
    dropOut(event.target.parentNode.parentNode)
    resetEdit()
  })
}

function bindExitShow() {
  document.getElementById('exit-show').addEventListener('click', (event) => {
    dropOut(event.target.parentNode)
    event.target.classList.add('no-display')
    const pinBubble = document.querySelector('.leaflet-popup-content-wrapper')
    if (pinBubble) {pinBubble.parentNode.remove(pinBubble)}
  })
}

function bindDeleteShow() {
  document.getElementById('remove-sighting').addEventListener('click', deleteSightingFromShow)
}

function resetCreate() {
  document.getElementById('create-coords').innerHTML = ''
  addPulseRed(document.getElementById('create-coords-p'))
  Array.from(document.querySelectorAll('input[type=text]')).forEach((input) => {input.value = ''})
  Array.from(document.querySelectorAll('textarea')).forEach((input) => {input.value = ''})
  removeCreateEditPin()
}

function resetEdit() {
  document.getElementById('edit-coords').innerHTML = ''
  addPulseRed(document.getElementById('edit-coords-p'))
  Array.from(document.querySelectorAll('input[type=text]')).forEach((input) => {input.value = ''})
  Array.from(document.querySelectorAll('textarea')).forEach((input) => {input.value = ''})
  removeCreateEditPin()
}

function bindAllButtons() {
  bindCreateButton()
  bindSubmitButtonCreate()
  bindExitCreate()
  bindExitEdit()
  bindWitchingHour()
}
