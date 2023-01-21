import { Schema, model, Types} from 'mongoose'
import { CartBase, CartItemForArray } from '../utilities/interfaces'

const itemSchema = new Schema<CartItemForArray>({
  productId: String,
  price: Number,
  quantity: Number
})

const cartSchema = new Schema<CartBase>({
  email: {
    type: String,
    required: true
  },
  items: [itemSchema],
  total: {
    type: Number,
    default: 0,
    min: 0
  }
})

export default model('cart', cartSchema)