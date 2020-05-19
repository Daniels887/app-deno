import { Router } from 'https://deno.land/x/oak/mod.ts'
import UsersController from './controllers/UsersController.ts'

const router = new Router()

router.get('/users', UsersController.show)
.post('/new', UsersController.store)
.delete('/user/:id', UsersController.delete)

export default router