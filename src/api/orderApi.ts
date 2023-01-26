import OrderDao from "../daos/order/orderDao";

class OrderApi{
  private dao: OrderDao = new OrderDao()

  async createOrder(email:string, paymentMethod: string, merchantId: string){
    return await this.dao.generateOrder(email, paymentMethod, merchantId)
  }
  async getOrder(orderNumber:string){
    return await this.dao.getOrder(orderNumber)
  }
  async cancelOrder(orderNumber: string){
    return await this.dao.cancelOrder(orderNumber)
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