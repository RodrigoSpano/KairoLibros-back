import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth'
const router = Router()

router.use('/auth', authRoutes)

export default router