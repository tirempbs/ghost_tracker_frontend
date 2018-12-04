class User {
  constructor(body) {
    this.name = body.name
    this.id = body.id
    allUsers.push(this)
  }
}

allUsers = []
