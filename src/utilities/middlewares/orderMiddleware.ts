import { NextFunction, Request, Response } from "express";
import orderModel from "../../models/order.model";


export const checkMerchantId = async (req: Request, res: Response, next: NextFunction) =>{
  const { query } = req
  if(query.topic === 'merchant_order'){
    const findCart = await orderModel.findOne({orderNumber: query.id})
    if(findCart) return res.status(400).json({msg:'order already exists'})
    return next()
  }
  return res.status(400)
}