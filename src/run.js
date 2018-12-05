document.addEventListener('DOMContentLoaded', () => {
  loadAllMonsters()
  loadAllSightings()
  setTimeout(() => {renderSightings()}, 500)
  bindAllButtons()
})
