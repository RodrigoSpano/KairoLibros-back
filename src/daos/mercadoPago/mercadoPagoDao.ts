import PaymentService from "../../services/PaymentsService";
import { RootMP_Body } from "../../utilities/types";


class MercadopagoDao {
  public subscriptionService: PaymentService
  constructor(subscriptionService: PaymentService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(email: string){
    try {
      const payment = await this.subscriptionService.createPayment(email)
      return payment
    } catch (error) {
      return error
    }
  }
}

export default MercadopagoDao