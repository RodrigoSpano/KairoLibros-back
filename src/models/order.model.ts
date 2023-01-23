import { Schema, model, Types } from 'mongoose'
import { OrderBase, ProductItemsOrder, UserBase } from '../utilities/types'

const userDataSchema = new Schema<Partial<UserBase>>({
  username: String,
  email: String,
  phone: String
})

const ProductItemsOrder = new Schema<ProductItemsOrder>({
  title: String,
  author: String,
  price: Number,
  quantity: Number,
  productId: String || Types.ObjectId
})

const OrderSchema = new Schema<OrderBase>({
  userData: userDataSchema,
  items: [ProductItemsOrder],
  ship: Boolean,
  address: String,
  date: Date,
  totalPrice: Number,
  paymentMehtod: String,
  orderNumber: String
})

export default model<OrderBase>('order',OrderSchema)