"use client"
import Wrapper from '@/components/app/Wrapper/Wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Control, Controller, FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit } from "react-hook-form"
import { Eye , EyeClosed, Router } from "lucide-react";
import AuthService from '@/services/auth.service'
import { toast } from 'sonner'
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation'
import Link from 'next/link'



 //registration schema


// RegistrationInputs type
export type RegistrationInputs = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}
interface RegisterForm {
  control :Control<RegistrationInputs>, handleSubmit:UseFormHandleSubmit<RegistrationInputs>,errors:FieldErrors<RegistrationInputs> ,onSubmit:SubmitHandler<RegistrationInputs>, loading:boolean, modal:boolean, openModal:(val:string)=>void
} 


const Register:React.FC<RegisterForm> = ({control , errors , handleSubmit,onSubmit,loading,modal=false , openModal}) => {
  const [showPasswordFields, setShowPasswordFields] = React.useState<{
  password: boolean;
  confirmPassword: boolean;
  }>({
  password: false,
  confirmPassword: false,
  });

  const togglePassword =(name: keyof typeof showPasswordFields)=>{
  setShowPasswordFields((prev)=>({
    ...prev,
    [name]:!prev[name]
  }))
  }

  return (
    <Wrapper className='px-10 md:w-1/2 mt-10 h-[80vh]'>
      <Card onClick={(e)=>e.stopPropagation()}>
        <CardHeader className='justify-center text-4xl font-bold'>Register</CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <CardContent>
            <div>Username</div>
            <Controller
              name='username'
              control={control}
              render={({ field }) => (
                <Input type="text" {...field} />
              )}
            />
             {errors && errors.username && <p className='text-red-500'>{errors.username.message}</p>}
          </CardContent>
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

          <CardContent>
            <div>Re-enter password</div>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
               <div className='flex items-center relative'>
                <Input type={showPasswordFields.confirmPassword ? "text" :"password"} {...field} />
               <div  className="absolute right-0 rounded-4xl h-full flex items-center px-2" onClick={()=>togglePassword('confirmPassword')}>
                 { showPasswordFields.confirmPassword ? <Eye/> :<EyeClosed/> }
                </div>
                </div>
              )}
            />
               {errors && errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
          </CardContent>
          <CardContent >
            <Button className='w-full cursor-pointer' type='submit'>{loading ? <Spinner/> :"Register"}</Button>
          </CardContent>
          <CardContent className='flex justify-between' >
               {!modal && <span><Link className="cursor-pointer underline" href={`/register`}>Login now</Link></span>}
                {modal && <span><div onClick={()=>openModal("Login")} className="cursor-pointer  underline" >Login now</div></span>}
                {modal && <span><div onClick={()=>openModal("VerifyEmail")} className="cursor-pointer  underline" >VerifyEmail</div></span>}
          </CardContent> 
        </form>
      </Card>
    </Wrapper>
  )
}

export default Register
