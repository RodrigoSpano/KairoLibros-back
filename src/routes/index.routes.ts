import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth'
const router = Router()

router.use('/auth', authRoutes)
router.get('/success', isAuth, (req, res) => res.json({user: req.user}))

export default router