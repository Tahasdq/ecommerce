"use client"
import { OrderService } from '@/services/admin/order.services'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const [order,setOrder]=useState({})
    const params = useParams()
    console.log("params",params.orderId)
    const orderService = new OrderService()
    const fetchOrder = async(orderId:string)=>{
    const response =  await orderService.getOrderById(String(orderId))
    // console.log("response" ,response )
    setOrder(response.order)
    }
    useEffect(()=>{
        fetchOrder(String(params.orderId))
    },[params.orderId])
 
  return (
    // <div>{order && Object.entries(order).map(([key,value])=>(<div key={key}> {key}: {typeof key ==="object" ? JSON.stringify(value):value}</div>))}</div>
    <div>order</div>
  )
}

export default page