"use client"
import Wrapper from '@/components/app/Wrapper/Wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import { Eye , EyeClosed } from "lucide-react";
import AuthService from '@/services/auth.service'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoginForm from '@/components/auth/Login'
import Login from '@/components/auth/Login'

 //Login Schema
const loginSchema = zod.object({
  email:zod.
  string()
  .min(1 , "Email is required")
  .email("Please Enter valid email"),
  password:zod
  .string()
  .min(1,"Password is required")

})

// Login Inputs type
type LoginInputs = {
  email: string,
  password: string,
}


const  page =  () => {
  const authService = new AuthService()
  const  router = useRouter()
  const [loading,setLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true)
    // console.log("form submitted",data)
    const payload = {
      email:data.email,
      password:data.password,
      requestFor:"admin"
    }
    try {
      const response =  await authService.loginUser(payload)
      if(response.success){
        console.log(response)
        toast.success(response.message)
        router.push('/admin')
        setLoading(false)
      }
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
    }
   

  }


  return (
  <Login control={control} handleSubmit={handleSubmit} modal ={false} errors={errors}  onSubmit = {onSubmit} loading={loading} openRegister={ (val:Boolean):void=>{} }/>

  )
}

export default page
