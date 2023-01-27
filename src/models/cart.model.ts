import { Schema, model, Types} from 'mongoose'
import { AddressInfo, CartBase, CartItemForArray } from '../utilities/types'

const itemSchema = new Schema<CartItemForArray>({
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

const cartSchema = new Schema<CartBase>({
  email: {
    type: String,
    required: true
  },
  items: [itemSchema],
  ship: {
    type:Boolean,
    default: false
  },
  shipCost: Number,
  address: addressSchema,
  total: {
    type: Number,
    default: 0,
    min: 0
  }
})

export default model<CartBase>('cart', cartSchema)