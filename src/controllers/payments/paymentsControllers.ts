import { Request, Response } from "express";

class PaymentController {
  public subscriptionService: any
  constructor(subscriptionService: any) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req: Request, res: Response){
    try {
      const payment = await this.subscriptionService.createPayment()
      return res.json(payment)
    } catch (error) {
      res.status(500).json({error: true, msg: 'failed to create payment'})
    }
  }

  async getSubscriptionLink(req: Request, res: Response){
    try {
      const subscription = await this.subscriptionService.createSubscription()
      return res.json(subscription)
    } catch (error) {
      res.status(500).json({error: true, msg:'failed to create subscription'})
    }
  }
}

export default PaymentController