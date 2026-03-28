import React from 'react'
import Wrapper from '../app/Wrapper/Wrapper'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Spinner } from '../ui/spinner'
import { Input } from '../ui/input'

type  verifyEmailInput={
  email:string
}
interface VerifyEmailProps{
    control :Control<verifyEmailInput>, handleSubmit:UseFormHandleSubmit<verifyEmailInput>,errors:FieldErrors<verifyEmailInput> ,onSubmit:SubmitHandler<verifyEmailInput>, loading:boolean, modal:boolean, openModal:(val:string)=>void
  
}

const VerifyEmail:React.FC<VerifyEmailProps> = ({control,errors ,handleSubmit , onSubmit,modal , openModal ,loading }) => {
  return (
   <Wrapper className='px-10 md:w-1/2 mt-10 h-[80vh]'>
      <Card onClick={(e)=>e.stopPropagation()}>
        <CardHeader className='justify-center text-4xl font-bold'>Verify your email</CardHeader>
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
          <CardContent >
            <Button className='w-full cursor-pointer' type='submit'>{loading ? <Spinner/> :"VerifyEmail"}</Button>
          </CardContent>
          <CardContent className='flex justify-between' >
               {!modal && <span><Link className="cursor-pointer underline" href={`/register`}>Login now</Link></span>}
                {modal && <span><div onClick={()=>openModal("Login")} className="cursor-pointer  underline" >Login Now</div></span>}
                {modal && <span><div onClick={()=>openModal("Registration")} className="cursor-pointer  underline" >Register Now</div></span>}
          </CardContent> 
        </form>
      </Card>
    </Wrapper>
  )
}

export default VerifyEmail