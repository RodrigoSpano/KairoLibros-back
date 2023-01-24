import MercadopagoDao from "../daos/mercadoPago/mercadoPagoDao";
import PaymentService from "../services/PaymentsService";
import { RootMP_Body } from "../utilities/types";

class MercadopagoApi{
  private dao: MercadopagoDao = new MercadopagoDao(new PaymentService())
  async getPaymentLink(){
    return await this.dao.getPaymentLink()
  }
}

export default MercadopagoApi