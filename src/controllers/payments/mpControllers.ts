import { Request, Response } from "express";
import MercadopagoApi from "../../api/mpApi";
import { RootMP_Body, UserBase } from "../../utilities/types";

const api: MercadopagoApi = new MercadopagoApi()

export const getPaymentLink =  async (req: Request, res: Response) => {
  try {
    // const user: Partial<UserBase> = req.user!
    const data: Partial<RootMP_Body> = {
      payer_email: req.body.email,
      items: req.body.items,
      shipCost: req.body.ship ? 700 : 0 
    }
    const paymentLink = await api.getPaymentLink(data)
    res.json(paymentLink)
  } catch (error) {
    res.json(500).json({error: true, msg:'failed to create link!'})
  }
}