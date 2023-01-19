import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth.routes'
import productsRoute from './products/product.routes'
const router = Router()

router.get('/success', isAuth, (req, res) => res.json({user: req.user})) //! temporal, fletar!
router.use('/auth', authRoutes)
router.use('/products', productsRoute)

export default router