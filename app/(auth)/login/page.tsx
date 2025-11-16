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


const page = () => {
  const authService = new AuthService()
   const router = useRouter()
  const [showPasswordFields, setShowPasswordFields] = useState<{
  password: boolean;
  confirmPassword: boolean;
  }>({
  password: false,
  confirmPassword: false,
  });
  const [loading,setLoading] = useState<Boolean>(false)

  const { control, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }

  }
  )

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true)
    // console.log("form submitted",data)
    const payload = {
      email:data.email,
      password:data.password
    }
    try {
      const response =  await authService.loginUser(payload)
      if(response.success){
        console.log(response)
        toast.success(response.message)
        router.push('/')
        setLoading(false)
      }
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
    }
   

  }

  const togglePassword =(name: keyof typeof showPasswordFields)=>{
  setShowPasswordFields((prev)=>({
    ...prev,
    [name]:!prev[name]
  }))
  }

  return (
    <Wrapper className='px-10 md:w-1/2 mt-10 h-screen flex flex-col justify-center items-center'>
      <Card className='min-w-3/4'>
        <CardHeader className='justify-center text-4xl font-bold'>Login</CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <CardContent>
            <div>Email</div>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <Input type="email" {...field} />
              )}
            />
               {errors && errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </CardContent>
          <CardContent>
            <div>Password</div>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <div className='flex items-center relative'>
                <Input type={showPasswordFields.password ? "text" :"password"} {...field} />
                <div className="absolute right-0 rounded-4xl h-full flex items-center px-2" onClick={()=>togglePassword("password")}>
                 { showPasswordFields.password ? <Eye/> :<EyeClosed/> }
                </div>
                </div>

              )}
            />
               {errors && errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </CardContent>

          <CardContent >
           <Button className='w-full cursor-pointer' type='submit'>{loading ? <Spinner/> :"Login"}</Button>
          </CardContent>
           <CardContent >
              <span><Link className="underline" href={"/register"}>Register now</Link></span>
          </CardContent>  
        </form>
      </Card>
    </Wrapper>
  )
}

export default page
