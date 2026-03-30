import { BaseService } from "./base.service";

const USER = "/user"
const LOGIN_USER = "user/login"
const IS_ME = "user/me"

class UserService extends BaseService{
    async getUserById(payload:any,){
        return this.get(USER ,payload)
    }
    async getAllUsers(filters:any){
        const params = new URLSearchParams();
        
        if (filters.type =="customer") {
            params.append('type', "customer");
        }
        return this.get(`${USER}?${params.toString()}`)

    }
}

export default UserService