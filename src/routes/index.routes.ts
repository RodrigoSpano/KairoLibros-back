import { Router } from "express";
import { isAuth } from "../utilities/middlewares/authMiddlewares";
import authRoutes from './auth/auth.routes'
import productsRoute from './products/product.routes'
import cartRoute from './cart/cart.routes'
import paymentRoute from './payment/payment.routes'
const router = Router()

router.get('/', (req, res) => res.send('<a target="_blank" href="/payment/mercadopago">mp</a>'))
router.use('/auth', authRoutes)
router.use('/products', productsRoute)
router.use('/cart', isAuth, cartRoute)
router.use('/payment', paymentRoute) // agregar is auth

export default router