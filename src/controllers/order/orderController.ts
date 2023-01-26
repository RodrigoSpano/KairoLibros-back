import { Request, Response } from "express";
import OrderApi from "../../api/orderApi";
import { UserBase } from "../../utilities/types";

const api: OrderApi = new OrderApi()

export const createOrderWithoutMP = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> = req.user!
    await api.createOrder(user.email!, req.body.paymentMethod, '')
      .then((resp: any) => {
        if(resp) return res.status(201).json({orderNumber: resp.orderNumber})
        res.status(400)
      })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await api.getOrder(req.params.orderNumber)
    if(!order) res.status(404).json({error: true, msg: 'order not found'})
    return res.status(200).json(order)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    await api.cancelOrder(req.params.orderNumber)
    return res.status(202).json({success: true})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await api.deleteOrder(req.params.id)
    return res.status(202)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const setSent = async (req: Request, res: Response) => {
  try {
    await api.setSent(req.params.orderNumber)
    return res.status(202).json({success: true, msg: `${req.params.orderNumber} sent true`})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const setArrived = async (req: Request, res: Response) => {
  try {
    await api.setArrived(req.params.orderNumber)
    return res.status(202).json({success: true, msg: `${req.params.orderNumber} arrived true`})
  } catch (error) {
    res.status(500).json(error)
  }
}