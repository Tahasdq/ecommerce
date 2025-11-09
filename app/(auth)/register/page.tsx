"use client"
import Wrapper from '@/components/app/Wrapper/Wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
import { Eye , EyeClosed } from "lucide-react";

 //registration schema
const registrationSchema = zod.object({
  username:zod
  .string()
  .min(1, "Username is required")
  .max(10 , "Username cannot exceed 10 characters"),
  email:zod.
  string()
  .min(1 , "Email is required")
  .email("Please Enter valid email"),
  password:zod
  .string()
  .min(8, "Password must be at least 8 characters"),
  confirmPassword:zod.string()

}).refine((data)=>data.password==data.confirmPassword , {
  message:"Password do not match",
  path:["confirmPassword"]
})

// RegistrationInputs type
type RegistrationInputs = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string
}


const page = () => {
  const [showPasswordFields, setShowPasswordFields] = React.useState<{
  password: boolean;
  confirmPassword: boolean;
  }>({
  password: false,
  confirmPassword: false,
  });

  const { control, handleSubmit, formState: { errors } } = useForm<RegistrationInputs>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }

  }
  )
  const onSubmit: SubmitHandler<RegistrationInputs> = () => {
    console.log("form submitted")
  }

  const togglePassword =(name: keyof typeof showPasswordFields)=>{
  setShowPasswordFields((prev)=>({
    ...prev,
    [name]:!prev[name]
  }))
  }

  return (
    <Wrapper className='px-10 md:w-1/2 mt-10 '>
      <Card>
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
            <Button className='w-full cursor-pointer' type='submit'>Register</Button>
          </CardContent>

        </form>
      </Card>
    </Wrapper>
  )
}

export default page
