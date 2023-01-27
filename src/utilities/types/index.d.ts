import { Document, Types } from "mongoose";
import { order_status, payment_method } from "./types";

//users
export interface UserBase {
  googleId?: string | Types.ObjectId;
  username: string;
  email: string;
  area_code: string;
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
  title: string
  description: string,
  unit_price: number
  quantity: number
  picture_url: string
  category_id: string
}

export interface AddressInfo {
  zip_code: string;
  street_name: string;
  street_number: number;
} 

export interface CartBase{
  id?: Types.ObjectId | string
  total: number
  email: string
  items: [CartItemForArray]
  ship: boolea
  shipCost?: number
  address?: AddressInfo
}

//order

export interface OrderBase {
  id?: Types.ObjectId | string
  userData: Partial<UserBase>
  items: [ProductItemsOrder]
  ship: boolean
  address?: string
  date: date
  totalPrice: number
  paymentMethod: payment_method
  merchantId?: string
  orderNumber: Types.ObjectId | string
  arrived: boolean,
  sent: boolean,
  orderStatus: string
}

//mp one payment
export interface RootMP_Body {
  payer_email: string
  items: ItemPayment[]
  backs_url: BacksUrlPayment
  shipments: shipmentsPayment
  notification_url: string
  shipCost: number
}

interface shipmentsPayment {
  cost: number
  mode: string
}

export interface ItemPayment {
  title: string
  description: string
  picture_url: string
  category_id: string
  quantity: number
  unit_price: number
}

export interface BacksUrlPayment {
  success: string
  failure: string
  pending: string
}
