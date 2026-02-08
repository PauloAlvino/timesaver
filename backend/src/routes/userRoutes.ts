import Router from 'express'
import { UserController } from '../controllers/UserController'
import { isAuth } from '../middlewares/isAuth'

const router = Router()
const userController = new UserController()

router.get('/me', isAuth, userController.getUser)
router.post('/register', userController.register)
router.patch('/me/update', isAuth, userController.updateUser)
router.patch('/me/password', isAuth, userController.updateUserPassword)
router.delete('/me', isAuth, userController.deleteUser)

export default router