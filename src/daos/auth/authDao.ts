import { LoginData, UserBase } from "../../utilities/interfaces";
import userModel from "../../models/user.model";
import bcrypt from 'bcrypt'

class AuthDao{
    protected model = userModel
    constructor(){}

    async register(data: UserBase){
        try {
            const user = new this.model(data)
            await user.save()
            return user
        } catch (error) {
            return error
        }
    }

    async login(data: LoginData){
        try {
            const user = await this.model.findOne({email: data.email})
            if(user){
                const isMatch = user.comparePassword(data.password)
                if(isMatch){
                    const token = user.createToken()
                    return {
                        user,
                        token
                    }
                }
            }
            return Error
        } catch (error) {
            return error
        }
    }

    async changePassword(email: string, password: string){
        try {
            const findUser = await userModel.findOne({email})
            if(findUser){
                const newPassword: string = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
                return await userModel.findOneAndUpdate({email}, {password: newPassword}, {new: true})
            } return Error
        } catch (error) {
            return error
        }
    }
}

export default AuthDao