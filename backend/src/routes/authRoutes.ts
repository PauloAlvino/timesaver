import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { isAuth } from "../middlewares/isAuth";
const router = Router()
const authController = new AuthController()

router.post('/login', authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', isAuth, authController.logout)

export default router


