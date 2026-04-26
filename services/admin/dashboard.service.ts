import { BaseService } from "../base.service"
const dashboard = "/dashboard"
const totalRevenue = "total-revenue"
const totalOrders = "total-orders"
const totalProducts = "total-products"
const totalCustomers = "total-customers"
const topProducts = "top-products"
const topSalesPerMonth = "total-sales-per-month"
export class DashboardService extends BaseService{
    async  getTotalRevenue (){
        return this.get(`${dashboard}/${totalRevenue}`)
    }
    async  getTotalOrders (){
        return this.get(`${dashboard}/${totalOrders}`)
    }
    async  getTotalCustomers (){
        return this.get(`${dashboard}/${totalCustomers}`)
    }
    async  getTotalProducts (){
        return this.get(`${dashboard}/${totalProducts}`)
    }
    async  getTopProducts (){
        return this.get(`${dashboard}/${topProducts}`)
    }
    async  getTopSalesPerMonth (){
        return this.get(`${dashboard}/${topSalesPerMonth}`)
    }
}