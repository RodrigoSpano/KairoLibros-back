import { Schema, model, Types} from 'mongoose'
import { CartBase, CartItemForArray } from '../utilities/types'

const itemSchema = new Schema<CartItemForArray>({
  productId: String,
  price: Number,
  quantity: Number,
  thumbnail: String
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
  total: {
    type: Number,
    default: 0,
    min: 0
  }
})

export default model<CartBase>('cart', cartSchema)