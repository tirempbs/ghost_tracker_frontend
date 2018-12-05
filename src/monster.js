class Monster {
  constructor(body) {
    this.name = body.name
    this.id = body.id
    allMonsters.push(this)
  }
}

let allMonsters = []

function fetchMonsters() {
  return fetch('http://localhost:3000/api/v1/monsters')
  .then(res => res.json())
}

function loadAllMonsters() {
  fetchMonsters().then(monsters => {
    monsters.forEach((monster) => {
      new Monster(monster)
    })
    console.log(`%cLoaded ${monsters.length} monsters`, 'color: orange')
  })
}
