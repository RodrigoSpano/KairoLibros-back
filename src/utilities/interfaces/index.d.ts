import { Document, Types } from "mongoose"

export interface UserBase extends Document{
    fullName: string
    email: string
    phone: string
    password: string,
    isAdmin: boolean,
    _id?: Types.ObjectId
    comparePassword(password: string): boolean,
    createToken(): string
}

export interface LoginData extends Document {
    email: string,
    password: string,
}