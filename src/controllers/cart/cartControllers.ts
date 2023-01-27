import { Request, Response } from "express";
import CartApi from "../../api/cartApi";
import { itemsControlFn } from "../../utilities/helpers/helpers";
import { UserBase } from "../../utilities/types";

const api: CartApi = new CartApi()

export const addProduct = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> | any = req.user!
    const checkItems = await itemsControlFn(user.email, req.body.productId)
    if(checkItems) return res.status(406).json('this product is already on cart')
    const addItemInCart = await api.addProduct(req.body, user.email)
    if(addItemInCart) return res.status(400) 
    return res.status(202).json({success: true})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getOneCart = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> | any = req.user!
    const cart = await api.getOneCart(user.email)
    return res.status(200).json(cart)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const toggleShip = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase>|any = req.user!
    await api.toggleShip(user.email)
    res.status(200).json({success: true})
  } catch (error) {
    return error
  }
}
  
  export const addAddressData = async (req: Request, res: Response) => {
    try {
      const user: Partial<UserBase> = req.user!
      await api.addAddressData(user.email!, req.body)
      res.status(200).json({addressData: req.body})
    } catch (error) {
      res.status(500).json(error)
    }
  }

export const removeItem = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> | any = req.user!
    await api.removeItem(user.email, req.params.id)
    res.status(200).json({success: true})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const clearCart = async (req: Request, res: Response) => {
  try {
    const user: Partial<UserBase> | any = req.user!
    await api.clearCart(user.email)
    return res.status(200).json({success: true})
  } catch (error) {
    res.status(500).json(error)
  }
}