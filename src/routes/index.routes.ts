import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth.routes'
import productsRoute from './products/product.routes'
const router = Router()

router.use('/auth', authRoutes)
router.use('/products', productsRoute)
router.use('/cart', isAuth)

export default router