import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth'
import homeRoute from './home/home'
const router = Router()

router.use('/auth', authRoutes)
router.use('/', homeRoute)

export default router