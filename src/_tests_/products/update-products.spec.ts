import { expect } from "@jest/globals";
import ProductDao from "../../daos/products/productDao";
import mongoose from "mongoose";


beforeEach(async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(`${process.env.MONGO_URI}`);
});

describe("update products functionality", () => {
  const dao:ProductDao = new ProductDao()
  const id:string = '63c976f4023b7b535616efe6'
  it('should update product price', async () => {
    const newPrice: number = 8090
    const response: any = await dao.updatePrice(id, newPrice)
    expect(response.price).toBe(newPrice)
  })
  it('should toggle popular property in a product', async () => {
    const findProd: any = await dao.getOneProduct(id)
    if(findProd.popular){
      const response: any = await dao.togglePopular(id)
      expect(response.popular).toBeFalsy()
    } else {
      const response: any = await dao.togglePopular(id)
      expect(response.popular).toBeTruthy()
    }
  })
  it('should toggle sale, if sale is true should add "off" % porcent', async () => {
    const off: number = 15
    const findProduct: any = await dao.getOneProduct(id)
    if(!findProduct.sale){
      const response: any = await dao.toggleSale(id, off)
      expect(response.sale).toBeTruthy()
      expect(response.off).toBeDefined()
      expect(response.off).toEqual(off)
    } else {
      const response: any = await dao.toggleSale(id, off)
      expect(response.sale).toBeFalsy()
      expect(response.off).toBeUndefined()
    }
  })
  it('should update stock', async () => {
    const stock:number = 77
    const response:any = await dao.updateStock(id, stock)
    expect(response.stock).toBe(stock)
  })
});

afterAll(() => mongoose.disconnect());
