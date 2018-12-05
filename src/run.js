document.addEventListener('DOMContentLoaded', () => {
  loadAllSightings()
  setTimeout(() => {renderSightings()}, 500)
  bindAllButtons()
})
