import { Document, Types } from "mongoose";

//users
export interface UserBase {
  googleId?: string | Types.ObjectId;
  username: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
  _id?: Types.ObjectId;
}

export interface UserFunctions extends UserBase {
  comparePassword(password: string): boolean;
  createToken(): string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface IResponseUser {
  statusCode: number;
  _body: {
    success: boolean;
    user: {
      username: string;
      email: string;
      phone: string;
      password: string;
      isAdmin: boolean;
      _id: string | Types.ObjectId;
    };
  };
}

//products
export interface IProductBase {
  title: string;
  author: string;
  price: number;
  gender: string[];
  description: string;
  images: String[];
  stock: number;
  popular: boolean;
  sale: boolean;
  off?: number;
  _id?: Types.ObjectId;
}

export interface ProductResponse {
  statusCode: number;
  headers: {
    "content-type": string;
  };
  _body: {
    stock?: number
    price?: number
    products?: IProductBase | IProductBase[];
    product?: IProductBase;
    error?: string;
  };
}

export interface CartItemForArray {
  productId: string
  price: number
  quantity: number
  thumbnail: string
}

export interface CartBase{
  id?: Types.ObjectId | string
  total: number
  email: string
  items: [CartItemForArray]
  ship: boolea
  shipCost?: number
}

export interface ProductItemsOrder {
  title: string
  author: string
  price: number
  quantity: number
  productId: string | Types.ObjectId
}

export interface OrderBase {
  id?: Types.ObjectId | string
  userData: Partial<UserBase>
  items: [ProductItemsOrder]
  ship: boolean
  address?: string
  date: date
  totalPrice: number
  paymentMehtod: string
  orderNumber: Types.ObjectId | string
}