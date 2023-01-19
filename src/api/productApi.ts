import ProductDao from "../daos/products/productDao";
import { IProductBase } from "../utilities/interfaces";

class ProductApi{
  private dao: ProductDao = new ProductDao()

  async createProduct(data: IProductBase){
    return await this.dao.createProduct(data)
  }
  async getProducts(){
    return await this.dao.getProducts()
  }
  async getOneProduct(id: string){
    return await this.dao.getOneProduct(id)
  }
  async getProductsByGender(gender: string){
    return await this.dao.getProductsByGender(gender)
  }
  async updatePrice(id: string, price: number){
    return await this.dao.updatePrice(id, price)
  }
  async togglePopular(id: string){
    return await this.dao.togglePopular(id)
  }
  async toggleSale(id: string, off: number){
    return await this.dao.toggleSale(id, off)
  }
  async deleteOne(id: string){
    return await this.dao.deleteOne(id)
  }
}

export default ProductApi