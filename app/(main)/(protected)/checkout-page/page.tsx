"use client"
import CartSummary, { CartItem } from '@/components/app/Checkout/CartSummary'
import CheckoutForm from '@/components/app/Checkout/CheckoutForm'
import Wrapper from '@/components/app/Wrapper/Wrapper'
import { useAppSelector } from '@/lib/redux/hooks/hooks'
import { BaseService } from '@/services/base.service'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Last name must be at least 2 characters'),
  address: z.string().min(5, 'Please enter a valid address'),
  city: z.string().min(2, 'Please enter a valid city'),
  state: z.string().min(1, 'Please select a state'),
  zipCode: z.string().min(5, 'Please enter a valid ZIP code'),
  country: z.string().min(1, 'Please select a country'),
  phone:z.string().min(11,'Please enter your phone number')
})
interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormValues) => void
}

export type CheckoutFormValues = z.infer<typeof checkoutSchema>

const page = () => {
  const [cartData, setCartData] = useState<CartItem[]>([])

  const {cartItems,totalPrice} = useAppSelector((state)=>state.cart)
  const userDetails = useAppSelector((state)=>state.user) 
  
  useEffect(()=>{
    setCartData(cartItems)
    if(userDetails){
      form.reset(
        {
          email:userDetails.email
        }
      )
    }
  },[])


   const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      name:"",
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Pakistan',
      phone:''
    },
  })
  
  const handleSubmit = async (data: CheckoutFormValues) => {
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
          <CheckoutForm onSubmit={handleSubmit} form = {form} />
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