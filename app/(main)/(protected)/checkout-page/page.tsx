"use client"
import CartSummary, { CartItem } from '@/components/app/Checkout/CartSummary'
import CheckoutForm from '@/components/app/Checkout/CheckoutForm'
import Wrapper from '@/components/app/Wrapper/Wrapper'
import { useAppSelector } from '@/lib/redux/hooks/hooks'
import { BaseService } from '@/services/base.service'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

// Sample cart data - in a real app, this would come from your cart state/context
const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    variant: 'Black',
  },
  {
    id: '2',
    name: 'Minimalist Watch',
    price: 149.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    variant: 'Silver',
  },
  {
    id: '3',
    name: 'Premium Backpack',
    price: 89.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
    variant: 'Navy Blue',
  },
]

const page = () => {
  const [cartData, setCartData] = useState<CartItem[]>([])

  const {cartItems,totalPrice} = useAppSelector((state)=>state.cart)
  useEffect(()=>{
    setCartData(cartItems)
  },[])

  const handleSubmit = async (data: unknown) => {
    console.log('Order submitted:', data)
    try {
      const baseService = new BaseService()
    const res = await baseService.post(`/payment` ,{cartData,totalPrice ,data, withCredentials: true })
      window.location.href = res.url;
    } catch(error){
       alert("Checkout failed")
    }

    // toast.success('Order placed successfully!')
  }
  return (
   <Wrapper>
    <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">
          Complete your order by filling in the details below.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left Side - Checkout Form */}
        <div className="lg:col-span-3">
          <CheckoutForm onSubmit={handleSubmit} />
        </div>

        {/* Right Side - Cart Summary */}
        <div className="lg:col-span-2">
          <CartSummary
            items={cartData}
          />
        </div>
      </div>
   </Wrapper>
  )
}

export default page