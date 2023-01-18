import productModel from "../../models/product.model";
import { IProductBase } from "../../utilities/interfaces";

class ProductDao {
  protected model = productModel
  constructor(){}

  async createProduct(data: IProductBase){
    try {
      const findProd = await this.model.findOne({title: data.title})
      if(findProd) throw new Error(' product already exists')
      const product = new this.model(data)
      await product.save()
      if(!product) throw new Error
      return product
    } catch (error) {
      return error
    }
  }

  async getOneProduct(id: string) {
    try {
      const product = await this.model.findById(id)
      if(!product) throw new Error
      return product
    } catch (error) {
      return error
    }
  }

  async getProducts(){
    try {
      const products: IProductBase[] = await this.model.find({})
      if(!products) throw new Error
      return products
    } catch (error) {
      return error
    }
  }

  async getProductsByGender(gender: string){
    try {
      const productsByGender: IProductBase[] = await this.model.find({gender})
      if(!productsByGender) throw new Error
      return productsByGender
    } catch (error) {
      return error
    }
  }

  async updatePrice(id: string, price: number){
    try {
      const product = await this.model.findOneAndUpdate({_id: id}, {price}, {new: true})
      if(!product) throw new Error
      return product
    } catch (error) {
      return error
    }
  }

  async togglePopular(id: string){
    try {
      const findProduct = await this.model.findById(id)
      if(!findProduct) throw new Error
      const product = await this.model.findOneAndUpdate({_id: id}, {popular: !findProduct}, {new: true})
      return product
    } catch (error) {
      return error
    }
  }

  async toggleSale(id: string, off: number){
    try {
      const findProduct = await this.model.findById(id)
      if(!findProduct) throw new Error
      if(findProduct.sale){
        const product = await this.model.findOneAndUpdate({_id: id}, {sale: false, $unset: {off}}, {new: true})
        return product
      } else {
        const product = await this.model.findOneAndUpdate({_id: id}, {sale: true, $set: {off}}, {new: true})
        return product
      }
    } catch (error) {
      return error
    }
  }

  async deleteOne(id: string){
    try {
      await this.model.deleteOne({_id: id})
    } catch (error) {
      return error
    }
  }

}

export default ProductDao