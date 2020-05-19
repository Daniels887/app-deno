import users from '../data/index.ts'

interface IUsers {
  name: string
  age: number
}

class Users {
  show(context: any) {
    context.response.body = users
  }
  
  async store(context: any) {
    const body = await context.request.body()
    const newUser: IUsers = body.value

    users.push(newUser)

    context.response.body = users
    context.response.status = 200
  }
}

export default new Users