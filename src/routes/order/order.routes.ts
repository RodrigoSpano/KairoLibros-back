import { Router } from "express";
import * as controllers from '../../controllers/order/orderController'
const router = Router()

router.post('/create', controllers.createOrderWithoutMP)
router.get('/:orderNumber', controllers.getOrder)
router.put('/sent/:orderNumber', controllers.setSent)
router.put('/arrived/:orderNumber', controllers.setArrived)
router.put('/cancel/:orderNumber', controllers.cancelOrder)
router.delete('/:id', controllers.deleteOrder)

export default router