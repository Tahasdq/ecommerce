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
    const [loading,setLoading]=useState<boolean>(false)
    const orderService = new OrderService()

    const fetchOrders = useCallback(async ()=>{
        try {
            setLoading(true)
            const response = await orderService.getAllOrders()
            setOrders(response.order)
        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    },[])
    const getOrdersByUserId = useCallback(async(userId:string)=>{
        try {
             setLoading(true)
            const response = await orderService.getOrdersByUserId(userId)
            setOrders(response.order)
        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    },[])
    const updateOrderStatusById = useCallback(async(userId:string,payload:any)=>{
        try {
             setLoading(true)
            const response = await orderService.orderStatusUpdate(userId,payload)
            return response;
        } catch (error) {
            throw error
        } finally{
            setLoading(false)
        }
    },[])
  return {orders ,loading, fetchOrders , getOrdersByUserId , updateOrderStatusById}
}

export default useOrder