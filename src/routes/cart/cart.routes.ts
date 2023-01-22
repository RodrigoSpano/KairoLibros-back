import { Router } from "express";
import { cartHandler } from "../../utilities/middlewares/cartMiddleware";
import * as controller from '../../controllers/cart/cartControllers'

const router = Router()

router.put('/', cartHandler, controller.addProduct)
router.get('/', cartHandler, controller.getOneCart)
router.delete('/clear', cartHandler, controller.clearCart)
router.delete('/clear/:id', controller.removeItem)
router.put('/ship', cartHandler, controller.toggleShip)

export default router