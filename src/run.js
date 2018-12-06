document.addEventListener('DOMContentLoaded', () => {
  loadAllMonsters()
  loadAllSightings().then(() => {renderSightings()})
  bindAllButtons()
})
