import { OrderService } from '@/services/admin/order.services'
import React, { useCallback, useState } from 'react'
interface Order{
    _id:string,
    orderId:string,
    createdAt:Date,
    orderStatus:string,
    email?:string,
    amount?:string,
    paymentStatus?:string,
    items?:[]
}
const useOrder = () => {
    const [orders , setOrders] = useState<Order[]>([])
    const orderService = new OrderService()

    const fetchOrders = useCallback(async ()=>{
        try {
            const response = await orderService.getAllOrders()
            setOrders(response.order)
        } catch (error) {
            throw error
        } 
    },[])
    const getOrdersByUserId = useCallback(async(userId:string)=>{
        try {
            const response = await orderService.getOrdersByUserId(userId)
            setOrders(response.order)
        } catch (error) {
            throw error
        } 
    },[])
  return {orders , fetchOrders , getOrdersByUserId}
}

export default useOrder