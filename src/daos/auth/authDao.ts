import { LoginData, UserBase } from "../../utilities/interfaces";
import userModel from "../../models/user.model";

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
        } catch (error) {
            return error
        }
    }

}

export default AuthDao