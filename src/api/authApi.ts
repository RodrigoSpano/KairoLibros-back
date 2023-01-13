import AuthDao from "../daos/auth/authDao";
import { LoginData, UserBase } from "../utilities/interfaces";

class AuthApi{
    private dao = new AuthDao()
    constructor(){}

    async register(data: UserBase){
        return await this.dao.register(data)
    }
    async login(data:LoginData){
        return await this.dao.login(data)
    }
}

export default AuthApi