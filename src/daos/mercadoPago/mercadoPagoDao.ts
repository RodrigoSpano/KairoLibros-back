import PaymentService from "../../services/PaymentsService";
import { RootMP_Body } from "../../utilities/types";


class MercadopagoDao {
  public subscriptionService: PaymentService
  constructor(subscriptionService: PaymentService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(){
    try {
      const payment = await this.subscriptionService.createPayment()
      return payment
    } catch (error) {
      return error
    }
  }
}

export default MercadopagoDao