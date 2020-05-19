import users from '../data/index.ts'

let i: number = 2

function nextId() {
  return i++
}

interface IUsers {
  id: number
  name: string
  age: number
}

class Users {
  show(context: any) {
    context.response.body = users
  }
  
  async store(context: any) {
    const body = await context.request.body()
    const newUser: IUsers = { id: nextId(), ...body.value }

    users.push(newUser)

    context.response.body = users
    context.response.status = 200
  }

  async delete(context: any) {
    const id = await context.params.id
    const i = users.findIndex(u => u.id == id)
    if(i < 0) return null

    const deleteUser = users.slice(i, 1)
    context.response.body = deleteUser ? deleteUser[0] : null
    context.response.status = 200
  }
}

export default new Users