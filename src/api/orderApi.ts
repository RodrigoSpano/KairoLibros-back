import OrderDao from "../daos/order/orderDao";
import { order_status, payment_method } from "../utilities/types/types";

class OrderApi{
  private dao: OrderDao = new OrderDao()

  async createOrder(email:string, paymentMethod: payment_method){
    return await this.dao.createOrderWithotMP(email, paymentMethod)
  }
  async getOrder(orderNumber:string){
    return await this.dao.getOrder(orderNumber)
  }
  async setOrderStatus(orderNumber: string, status: order_status){
    return await this.dao.setOrderStatus(orderNumber, status)
  }
  async deleteOrder(id: string){
    return await this.dao.deleteOrder(id)
  }
  async setSent(orderNumber: string){
    return await this.dao.setSent(orderNumber)
  }
  async setArrived(orderNumber:string){
    return await this.dao.setArrived(orderNumber)
  }
}
export default OrderApi