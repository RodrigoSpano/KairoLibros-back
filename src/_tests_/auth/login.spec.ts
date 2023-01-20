import { expect } from "@jest/globals";
import AuthDao from "../../daos/auth/authDao";
import { LoginData } from "../../utilities/interfaces";
import mongoose from "mongoose";
import request from 'supertest'
import app from '../../index'

beforeEach(async () => {
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(`${process.env.MONGO_URI}`)
});

describe("testing login functionality", () => {
  const dao: AuthDao = new AuthDao();
  it("should return a token", async () => {
    const data: LoginData = {
      email: "rorrospano17@gmail.com",
      password: "contrasena",
    };
    const response = await dao.login(data);
    expect(response.token).toBeDefined();
  });
	it("shouldn't return a token", async () => {
		const wrongData = {
			email: 'rorrospano17@gmail.com',
			password: 'contra'
		}
		const response = await dao.login(wrongData)
		expect(response).toBeUndefined()
	})
});

describe('testing endopoint', () => {
  const data: LoginData = {
    email: 'rorrospano17@gmail.com',
    password: 'contrasena'
  }
  it('should return statusCode 200', async () => {
    const response = await request(app).post('/auth/login').send(data)
    expect(response.statusCode).toBe(200)
  })
  it('should return json', async () => {
    const data: LoginData = {
      email: 'rorrospano17@gmail.com',
      password: 'contrasena'
    }
    const response = await request(app).post('/auth/login').send(data)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
  })
  it('should redirect to home and authorize me', async () => {
    const response = await request(app).post('/auth/login').send(data)
    expect(response.redirect).toBeTruthy()

  })
  it('should return statuscode 404, error, user not found', async () => {
    const response = await request(app).post('/auth/login').send({email: 'wrong@mail.com', password:'contra'})
    expect(response.statusCode).toBe(404)
  })
})

afterAll(() => mongoose.disconnect());
