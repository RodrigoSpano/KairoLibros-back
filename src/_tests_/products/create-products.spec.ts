import { expect } from "@jest/globals";
import mongoose from "mongoose";
import ProductDao from "../../daos/products/productDao";
import { IProductBase, ProductResponse } from "../../utilities/interfaces";
import request from "supertest";
import app from "../../index";

beforeEach(async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(`${process.env.MONGO_URI}`);
});

const productMock: IProductBase = {
  title: "un cuento perfecto",
  author: "Elizabeth Benavent",
  price: 8090,
  gender: ["ficcion", "romance"],
  description: "lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
  images: [
    "https://contentv2.tap-commerce.com/cover/large/9789877391695_1.jpg?id_com=1113",
  ],
  stock: 23,
  popular: false,
  sale: false,
};

describe("Create Products functionality", () => {
  const dao: ProductDao = new ProductDao();
  it("should create a product succesfully", async () => {
    const response: any = await dao.createProduct(productMock);
    expect(response._id).toBeDefined();
  });
  it("shouldt throw error, missing tittle and author", async () => {
    const response: any = await dao.createProduct({
      title: "",
      author: "",
      price: 4000,
      gender: ["ficcion", "fantasia"],
      description: "lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
      images: ["una foto de harry potter"],
      stock: 23,
      popular: false,
      sale: false,
    });
    expect(response._message).toEqual("products validation failed");
  });
});

describe("endpoint test", () => {
  it("should return 200 statuscode", async () => {
    const response = await request(app).post("/products").send({
      title: "probando123",
      author: "Elizabeth Benavent",
      price: 8090,
      gender: ["ficcion", "romance"],
      description: "lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
      images: [
        "https://contentv2.tap-commerce.com/cover/large/9789877391695_1.jpg?id_com=1113",
      ],
      stock: 23,
      popular: false,
      sale: false,
    });
    expect(response.statusCode).toBe(200);
  });
  it("should return in format json", async () => {
    const response: Partial<ProductResponse> = await request(app).post("/products").send({
      title: "estoy probadno de nuevo",
      author: "Elizabeth Benavent",
      price: 8090,
      gender: ["ficcion", "romance"],
      description: "lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
      images: [
        "https://contentv2.tap-commerce.com/cover/large/9789877391695_1.jpg?id_com=1113",
      ],
      stock: 23,
      popular: false,
      sale: false,
    })
    expect(response.headers!['content-type']).toEqual(expect.stringContaining('application/json'));
  });
  it('should return error', async () => {
    const response: Partial<ProductResponse> = await request(app).post('/products').send(productMock)
    expect(response.statusCode).toBe(400)
    expect(response._body!.error).toEqual('product already exists')
  })
});

afterAll(() => mongoose.disconnect());

