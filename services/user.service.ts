import { BaseService } from "./base.service";

const USER = "user"
const LOGIN_USER = "user/login"
const IS_ME = "user/me"

class UserService extends BaseService{
    async getUserById(payload:any,){
        return this.get(USER ,payload)
    }
}

export default UserService