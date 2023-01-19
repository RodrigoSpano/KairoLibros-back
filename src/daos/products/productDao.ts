import productModel from "../../models/product.model";
import { IProductBase } from "../../utilities/interfaces";

class ProductDao {
  private model = productModel
  constructor(){}

  async createProduct(data: IProductBase){
    try {
      const findProd = await this.model.findOne({title: data.title})
      if(findProd) throw new Error('product already exists')
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
      const productsByGender: IProductBase[] | IProductBase = await this.model.find({gender: gender})
      if(productsByGender.length === 0) throw new Error('there is no products') 
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
      if(!findProduct) throw new Error('product doesnt exists')
      const product = await this.model.findOneAndUpdate({_id: id}, {popular: !findProduct.popular}, {new: true})
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
        const product = await this.model.findOneAndUpdate({_id: id}, {$unset: {'off': ''}, sale: false}, {new: true})
        return product
      } else {
        const product = await this.model.findOneAndUpdate({_id: id}, {$set: {'off': off}, sale: true}, {new: true})
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