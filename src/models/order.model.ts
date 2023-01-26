import { Schema, model } from 'mongoose'
import { AddressInfo, CartItemForArray, OrderBase, UserBase } from '../utilities/types'

const userDataSchema = new Schema<UserBase>({
  username: String,
  email: String,
  phone: String
})

const ProductItemsOrder = new Schema<CartItemForArray>({
  productId: String,
  title: String,
  description: String,
  unit_price: Number,
  quantity: Number,
  picture_url: String,
  category_id: String
})

const addressSchema = new Schema<AddressInfo>({
  zip_code: String,
  street_name: String,
  street_number: Number
})

const OrderSchema = new Schema<OrderBase>({
  userData: userDataSchema,
  items: [ProductItemsOrder],
  ship: Boolean,
  address: addressSchema,
  date: Date,
  totalPrice: Number,
  paymentMehtod: String,
  merchantId: String,
  orderNumber: String,
  arrived: {
    type:Boolean,
    default: false
  },
  sent: {
    type: Boolean,
    default: false
  },
  orderStatus: {
    type: String,
    default: 'approved'
  }
})

export default model<OrderBase>('order', OrderSchema)