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

  async delete(context: any): Promise<void> {
    const id = await context.params.id
    const i = users.findIndex(u => u.id == id)

    users.splice(i, 1)
    context.response.body = users
    context.response.status = 200
  }

  async update(context: any): Promise<void>  {
    const id = await context.params.id
    const i = users.findIndex(u => u.id == id)

    const body = await context.request.body()
    const updateUser = {
      ...users[i],
      ...body.value
    }

    users.splice(i, 1, updateUser)
    context.response.body = users
    context.response.status = 200
  }
}

export default new Users