import { Request, Response } from "express";
import MercadopagoApi from "../../api/mpApi";
import { RootMP_Body, UserBase } from "../../utilities/types";

const api: MercadopagoApi = new MercadopagoApi()

export const getPaymentLink =  async (req: Request, res: Response) => {
  try {
    const paymentLink = await api.getPaymentLink('test_user_1294452860@testuser.com')
    res.redirect(paymentLink.init_point)
  } catch (error) {
    res.json(500).json({error: true, msg:'failed to create link!'})
  }
}