import {Schema, model} from "mongoose";
import { IProductBase } from "../utilities/types";

const productSchema = new Schema<IProductBase>({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    requierd: true,
  },
  gender: Array,
  description: {
    type: String,
    required: true
  },
  images: Array,
  stock: {
    type: Number,
    default: 1
  },
  popular: {
    type: Boolean,
    default: false
  },
  sale: {
    type: Boolean,
    default: false
  },
  off: Number
})

export default model<IProductBase>('products', productSchema)