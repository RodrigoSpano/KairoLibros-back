import AuthDao from "../daos/auth/authDao";
import { LoginData, UserBase } from "../utilities/types";

class AuthApi{
    private dao = new AuthDao()
    constructor(){}

    async register(data: UserBase){
        return await this.dao.register(data)
    }
    async login(data:LoginData){
        return await this.dao.login(data)
    }
    async changePassword(email: string, password: string){
        return await this.dao.changePassword(email, password)
    }
}

export default AuthApi