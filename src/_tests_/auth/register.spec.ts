import mongoose, { isValidObjectId } from 'mongoose'
import {expect} from '@jest/globals'
import request from 'supertest'

import { IResponseUser, UserBase } from '../../utilities/interfaces' 
import AuthDao from '../../daos/auth/authDao'
import app from '../../index'

beforeEach(async () => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(`${process.env.MONGO_URI}`)
        .then(() => console.log('db connected'))
})

describe('testing functionality', () =>{
    const dao = new AuthDao()
    it('should create a user and return it', async () => {
        const data: UserBase = {
            fullName: 'juancito castillo',
            email: 'prueba@gmail.com',
            phone: '+54 1177623123',
            password: 'contrasena'
        }
        const user = await dao.register(data)
        expect(user.fullName).toBeDefined()
        expect(user.email).toBeDefined()
        expect(user.phone).toBeDefined()
        expect(user.password).toBeDefined()
        expect(user.isAdmin).toBeFalsy()
        expect(isValidObjectId(user._id))
    } )
    it('should fail due a missing field', async () => {
        const wwrongData = {
            fullName: 'rodrigo spano',
            email: 'adsa@sada.com',
            password:'contra'
        }
        const response = await dao.register(wwrongData)
        expect(response._message).toEqual('user validation failed')
    })
})


describe('testing endpoint', () => {
    it('shuold return 200 statusCode', async () =>{
        const data = {
            firstName: 'rodrigo',
            lastName: 'spano',
            email: 'rorrospano17@gmail.com',
            phoneArea: '+54',
            phoneNumber: '1188776544',
            password: 'contrasena',
            repeatPassword: 'contrasena'
        }
        const response = await request(app).post('/auth/signup').send(data)
        expect(response.statusCode).toBe(200)
    })
    it('should return userData after creating it', async () => {
        const data = {
            firstName: 'rodrigo',
            lastName: 'spano',
            email: 'pepepe@gmail.com',
            phoneArea: '+54',
            phoneNumber: '1188776544',
            password: 'contrasena',
            repeatPassword: 'contrasena'
        }
        const response: IResponseUser = await request(app).post('/auth/signup').send(data)
        expect(response._body.success).toBeTruthy()
        expect(response._body.user.username).toBeDefined()
        expect(response._body.user.email).toBeDefined()
        expect(response._body.user.phone).toBeDefined()
        expect(response._body.user.password).toBeDefined()
        expect(response._body.user.isAdmin).toBeFalsy()
    })
    it('should return error statuscode 400, passwords do not match', async () => {
        const wrongData = {
            firstName: 'rodrigo',
            lastName: 'spano',
            email: 'rorrospano17@gmail.com',
            phoneArea: '+54',
            phoneNumber: '1188776544',
            password: 'contrasena',
            repeatPassword: 'contrasenia'
        }
        const response = await request(app).post('/auth/signup').send(wrongData)
        expect(response.statusCode).toBe(400)
    })
})

afterAll(async () => {
    await mongoose.disconnect()
})