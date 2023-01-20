import { Request, Response } from "express";
import ProductApi from "../../api/productApi";
import productModel from "../../models/product.model";

const api: ProductApi = new ProductApi();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products: any = await api.getProducts();
    if (products.length === 0) res.status(404);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product = await api.getOneProduct(req.params.id);
    if (!product) res.status(404);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getProductsByGender = async (req: Request, res: Response) => {
  try {
    const productsByGender: any = await api.getProductsByGender(
      req.params.gender
    );
    if (productsByGender.length === 0) res.status(404);
    return res.status(200).json({ products: productsByGender });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const findProdByTitle = await productModel.findOne({title: req.body.title});
    if (findProdByTitle) return res.status(400).json({ error: "product already exists" });
    const product = await api.createProduct(req.body);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updatePrice = async (req: Request, res: Response) => {
  try {
    const findProd = await productModel.findById(req.params.id)
    if(!findProd) return res.status(400).json('product do not exists') 
    const updateProductPrice = await api.updatePrice(
      req.params.id,
      req.body.price
    );
    res.status(200).json({ product: updateProductPrice });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const findProd = await productModel.findById(req.params.id)
    if(!findProd) return res.status(400).json('product do not exists') 
    const productToStock = await api.updateStock(req.params.id, req.body.stock)
    res.status(200).json({product: productToStock})
  } catch (error) {
    res.status(500).json(error)
  }
}

export const togglePopular = async (req: Request, res: Response) => {
  try {
    const findProd = await productModel.findById(req.params.id)
    if(!findProd) return res.status(400).json('product do not exists') 
    const product = await api.togglePopular(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const toggleSale = async (req: Request, res: Response) => {
  try {
    const findProd = await productModel.findById(req.params.id)
    if(!findProd) return res.status(400).json('product do not exists') 
    const product = await api.toggleSale(req.params.id, req.body.off);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOne = async (req: Request, res: Response) => {
  try {
    await api.deleteOne(req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
};
