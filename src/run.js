document.addEventListener('DOMContentLoaded', () => {
  loadAllUsers()
  loadAllSightings()
  setTimeout(() => {renderSightings()}, 500)
  bindAllButtons()
})
