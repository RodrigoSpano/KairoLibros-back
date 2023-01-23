import { Router } from "express";
import PaymentController from '../../controllers/payments/paymentsControllers'
import PaymentService from '../../services/PaymentsService'
const router = Router()

const PaymentInstance = new PaymentController(new PaymentService())

router.get('/mercadopago', (req, res) => {
  PaymentInstance.getPaymentLink(req, res)
} )
router.get('/subscription', (req, res) => {
  PaymentInstance.getSubscriptionLink(req, res)
} )

export default router