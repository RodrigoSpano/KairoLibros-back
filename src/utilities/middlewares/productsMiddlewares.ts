import { NextFunction, Request, Response } from "express";
import productModel from "../../models/product.model";

export const verifyExists = async (req: Request, res: Response, next: NextFunction) => {
  const findProd = await productModel.findById(req.params.id)
  if(findProd) return next()
  return res.status(404).json({error: 'product not found'})
}