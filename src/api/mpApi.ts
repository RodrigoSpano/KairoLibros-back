import MercadopagoDao from "../daos/mercadoPago/mercadoPagoDao";
import PaymentService from "../services/PaymentsService";
import { RootMP_Body } from "../utilities/types";

class MercadopagoApi{
  private dao: MercadopagoDao = new MercadopagoDao(new PaymentService())
  async getPaymentLink(data: Partial<RootMP_Body>){
    return await this.dao.getPaymentLink(data)
  }
}

export default MercadopagoApi