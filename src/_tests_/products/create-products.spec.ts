import { expect } from "@jest/globals";
import mongoose from "mongoose";
import ProductDao from "../../daos/products/productDao";
import { IProductBase } from "../../utilities/interfaces";

beforeEach( async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(`${process.env.MONGO_URI}`)
})

const productMock: IProductBase = {
  title: 'un cuento perfecto',
  author: 'Elizabeth Benavent',
  price: 8090,
  gender: ['ficcion', 'romance'],
  description: 'lorem ipsu lorem ipsu lorem ipsu lorem ipsu',
  images: ['https://contentv2.tap-commerce.com/cover/large/9789877391695_1.jpg?id_com=1113'],
  stock: 23,
  popular: false,
  sale: false
}

describe('Create Products functionality', () => {
  const dao: ProductDao = new ProductDao()
  it('should create a product succesfully', async () => {
    const response = await dao.createProduct(productMock)
    expect(response._id).toBeDefined()
  })
  it('shouldt throw error, missing tittle and author', async () => {
    const response = await dao.createProduct({
      title: '',
      author: '',
      price: 4000,
      gender: ['ficcion', 'fantasia'],
      description: 'lorem ipsu lorem ipsu lorem ipsu lorem ipsu',
      images: ['una foto de harry potter'],
      stock: 23,
      popular: false,
      sale: false
    })
    expect(response._message).toEqual('products validation failed')
  })
  it('should return error, product already exists', async () => {
    const response = await dao.createProduct(productMock)
    expect(response).toEqual
    expect.objectContaining('product already exists')
  })
})

afterAll(() => mongoose.disconnect())