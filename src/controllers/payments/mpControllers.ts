import axios from "axios";
import { Request, Response } from "express";
import MercadopagoApi from "../../api/mpApi";
import { UserBase } from "../../utilities/types";
import OrderDao from "../../daos/order/orderDao";
import store from 'store2'
import orderModel from "../../models/order.model";

const api: MercadopagoApi = new MercadopagoApi()

export const getPaymentLink =  async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> = req.user!
    const paymentLink = await api.getPaymentLink('test_user_1294452860@testuser.com')
    res.redirect(paymentLink.init_point)
  } catch (error) {
    res.status(500).json({error: true, msg:'failed to create link!'})
  }
}

export const postNotifications = async (req: Request, res: Response) => {
  try {
  const orderDao:OrderDao = new OrderDao()

  const {query} = req

  let mp_merchantId:any;
  if(query.topic === 'merchant_order' && typeof(query.id) !== undefined){
    if(query.id !== mp_merchantId){
      mp_merchantId = query.id
      const findOrder = await orderModel.findOne({merchantId: mp_merchantId})
      !findOrder ? 
        await orderDao.generateOrder('test_user_1294452860@testuser.com', 'mercadopago', mp_merchantId)
          : res.end()
    } else if(query.id === mp_merchantId || typeof query.id === undefined){
      res.end()
    }
  }

  res.end()
  } catch (error) {
    res.status(500).json({error: true, msg:error})
  }
}