import { BaseService } from "./base.service";

const REGISTER_USER = "user/register"
const LOGIN_USER = "user/login"

class AuthService extends BaseService{
    async registerUser(payload){
       return this.post(REGISTER_USER , payload , )
    }
    async loginUser(payload){
        return this.post(LOGIN_USER ,payload)
    }
}

export default AuthService