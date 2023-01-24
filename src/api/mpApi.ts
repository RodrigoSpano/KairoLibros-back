import MercadopagoDao from "../daos/mercadoPago/mercadoPagoDao";
import PaymentService from "../services/PaymentsService";

class MercadopagoApi{
  private dao: MercadopagoDao = new MercadopagoDao(new PaymentService())
  async getPaymentLink(email: string){
    return await this.dao.getPaymentLink(email)
  }
}

export default MercadopagoApi