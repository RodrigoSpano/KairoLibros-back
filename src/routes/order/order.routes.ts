import { Router } from "express";
import * as controllers from '../../controllers/order/orderController'
import { isAdmin } from "../../utilities/middlewares/authMiddlewares";
const router = Router()

router.post('/create', controllers.createOrderWithoutMP)
router.get('/:orderNumber', isAdmin,controllers.getOrder)
router.put('/sent/:orderNumber', isAdmin, controllers.setSent)
router.put('/arrived/:orderNumber', isAdmin, controllers.setArrived)
router.put('/cancel/:orderNumber', isAdmin, controllers.cancelOrder)
router.delete('/:id', isAdmin, controllers.deleteOrder)

export default router