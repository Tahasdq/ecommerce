import { BaseService } from "./base.service";

const REGISTER_USER = "auth/register"
const LOGIN_USER = "auth/login"
const IS_ME = "auth/me"

class AuthService extends BaseService{
    async registerUser(payload:any) {
       return this.post(REGISTER_USER,payload)
    }
    async loginUser(payload:any){
        return this.post(LOGIN_USER ,payload)
    }
    async isMe(){
        return this.get(IS_ME)
    }
}

export default AuthService