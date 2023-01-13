import { Schema, model } from "mongoose"
import {UserBase, UserFunctions} from '../utilities/interfaces/index'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema<UserBase>({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
})

userSchema.pre('save', function(next){
    if(!this.isModified('password')) return next()
    
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    return next()
})

userSchema.methods.comparePassword = function(password: string) {
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.createToken = function(){
    return jwt.sign({id: this.id, email: this.email}, `${process.env.JWT_SECRET}`, {expiresIn: '30m'})
}

export default model<UserFunctions>('user', userSchema)