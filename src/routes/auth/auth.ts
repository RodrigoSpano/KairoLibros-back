import { Router } from "express";
import { login, logout, signup } from "../../controllers/auth/authControllers";
import * as authMiddlewares from "../../utilities/middlewares/authMiddlewares";

const router = Router()

router.post('/signup', authMiddlewares.registerVerify, signup)
router.post('/login', authMiddlewares.userExists, login)
// router.delete('/logout', authMiddlewares.userIsLogged, logout)
router.delete('/logout', logout)

export default router