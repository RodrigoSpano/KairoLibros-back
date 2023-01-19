import { NextFunction, Request, Response } from "express";
import productModel from "../../models/product.model";

export const verifyExists = async (req: Request, res: Response, next: NextFunction) => {
  const findProdByTitle = await productModel.findOne({title: req.body.title})
  if(findProdByTitle) return res.status(400).json({error: 'product already exists'})
  return next()
}