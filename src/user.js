class User {
  constructor(body) {
    this.name = body.name
    this.id = body.id
    allUsers.push(this)
  }
}

let allUsers = []

function fetchUsers() {
  return fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
}

function loadAllUsers() {
  fetchUsers().then(users => {
    users.forEach((user) => {
      new User(user)
    })
    console.log(`%cLoaded ${users.length} users`, 'color: orange')
  })
}
