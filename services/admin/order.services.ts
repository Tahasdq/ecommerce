import { BaseService } from "../base.service"
const order = "/order"
export class OrderService extends BaseService{
    async  getAllOrders (){
        return this.get(order)
    }
    async getOrderById(id:any){
        return this.get(`${order}/${id}`)
    }
    async orderStatusUpdate(id:any , payload:any){
        return this.put(`${order}/${id}` ,payload )
    }
    async getOrdersByUserId(id:any){
        return this.get(`${order}/user/${id}` )
    }
}