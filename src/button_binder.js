function bindCreateButton() {
  document.getElementById('open-create').addEventListener('click', (event) => {
    toggleInvisible(event.target)
    dropOut(document.getElementById('edit-form'))
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
  })
}

function bindAllButtons() {
  bindCreateButton()
  bindSubmitButtonCreate()
  bindExitCreate()
}
