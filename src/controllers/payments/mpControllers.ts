import { Request, Response } from "express";
import MercadopagoApi from "../../api/mpApi";
import { UserBase } from "../../utilities/types";
import OrderDao from "../../daos/order/orderDao";

const api: MercadopagoApi = new MercadopagoApi()

export const getPaymentLink =  async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> = req.user!
    const paymentLink = await api.getPaymentLink(user.email!)
    res.redirect(paymentLink.init_point)
  } catch (error) {
    res.status(500).json({error: true, msg:'failed to create link!'})
  }
}

export const postNotifications = async (req: Request, res: Response) => {
  try {
  const orderDao:OrderDao = new OrderDao()
  const user: Partial<UserBase> = req.user!
  const {query} = req

  if(query.topic === 'merchant_order') {
    let merchantId:any = query.id
    const newOrder = await orderDao.generateOrder(user.email!, 'mercadopago', merchantId)
    return res.status(201).json(newOrder)
  }
  } catch (error) {
    res.status(500).json({error: true, msg:error})
  }
}