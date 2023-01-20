import { expect } from "@jest/globals";
import { IProductBase, ProductResponse } from "../../utilities/interfaces";
import ProductDao from "../../daos/products/productDao";
import mongoose, { Types } from "mongoose";
import request from 'supertest'
import app from '../../index'

beforeEach(async () => {
  mongoose.set('strictQuery', false)
  await mongoose.connect(`${process.env.MONGO_URI}`)
})

const id: string = '63c976f4023b7b535616efe6' //cambiar id por uno valido de algun producto
describe('get products functionality', () => {
  const dao: ProductDao = new ProductDao()
  it('should return all products', async () => {
    const response = await dao.getProducts()
    expect(response).toBeInstanceOf(Object)
  })
  it('should return one product', async () => {
    const response: any = await dao.getOneProduct(id)
    expect(response._id).toEqual(new Types.ObjectId(id))
  })
  it('should return products by category/gender', async () => {
    const gender = 'romance'
    const response: any = await dao.getProductsByGender(gender)
    expect(response).toBeInstanceOf(Object)
    expect(response.forEach((el: IProductBase) => expect(el.gender).toContain(gender)))
  })
})

describe('endpoint tests', () => {
  describe('get all products tests', () => {
    it('should return status 200', async () => {
      const response: Partial<ProductResponse> = await request(app).get('/products')
      expect(response.statusCode).toBe(200)
    })
    it('should return in type JSON', async () => {
      const response: Partial<ProductResponse> = await request(app).get('/products')
      expect(response.headers!['content-type']).toEqual(expect.stringContaining('application/json'))
    })
    it('should return an array of objects', async () => {
      const response: Partial<ProductResponse> = await request(app).get('/products')
      expect(response._body!).toBeInstanceOf(Object)
    })
  })
  describe('get one product tests', () => {
    it('should return status 200', async () => {
      const response: Partial<ProductResponse> = await request(app).get(`/products/${id}`)
      expect(response.statusCode).toBe(200)
    })
    it('should return in type JSON', async () => {
      const response: Partial<ProductResponse> = await request(app).get(`/products/${id}`)
      expect(response.headers!['content-type']).toEqual(expect.stringContaining('application/json'))
    })
  })
  describe('get by gender tests', () => {
    const gender: string = 'romance'
    it('should return status 200', async () => {
      const response: Partial<ProductResponse> = await request(app).get(`/products/gender/${gender}`)
      console.log(response)
      expect(response.statusCode).toBe(200)
    })
    it('should return in type JSON', async () => {
      const response: Partial<ProductResponse> = await request(app).get(`/products/gender/${gender}`)
      expect(response.headers!['content-type']).toEqual(expect.stringContaining('application/json'))
    })
  })
})

afterAll(()=>mongoose.disconnect())