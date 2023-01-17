import { Document, Types } from "mongoose"

export interface UserBase {
    googleId?: string | Types.ObjectId
    fullName: string
    email: string
    phone: string
    password: string,
    isAdmin?: boolean,
    _id?: Types.ObjectId
}

export interface UserFunctions extends UserBase {
    comparePassword(password: string): boolean,
    createToken(): string
}

export interface LoginData {
    email: string,
    password: string,
}

export interface IResponseUser {
    statusCode: number
    _body: {
        success: boolean
        user: {
            fullName: string
            email: string
            phone: string
            password: string
            isAdmin: boolean
            _id: string | Types.ObjectId
        }
    }
}