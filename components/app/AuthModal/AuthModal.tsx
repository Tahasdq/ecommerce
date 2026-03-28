"use client";
import {
  Dialog,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { LoginInputs } from "@/types/auth/login.type";
import Login from "@/components/auth/Login"
import { toast } from "sonner";
import Register, { RegistrationInputs } from "@/components/auth/Register";
import { registrationSchema } from "@/types/auth/register.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/types/auth/login.type";
import VerifyEmail from "@/components/auth/VerifyEmail";
import { verifyEmailSchema } from "@/types/auth/verifyEmail.type";
import Wrapper from "../Wrapper/Wrapper";
import { Card } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";
// import { success } from "zod";
interface LoginForm {
open:boolean , onClose :()=>void, to:string,setRegistrationModal:(val:boolean)=>void,setLoginModal:(val:boolean)=>void
}
interface RegisterForm {
open:boolean , onClose :()=>void,setRegistrationModal:(val:boolean)=>void,setLoginModal:(val:boolean)=>void ,setVerifyEmailModal:(val:boolean)=>void
}
interface VerifyEmailFormValues {
open:boolean , onClose :()=>void,setRegistrationModal:(val:boolean)=>void,setLoginModal:(val:boolean)=>void, setVerifyEmailModal:(val:boolean)=>void ,setEmailVerifitionSentModal:(val:boolean)=>void
}
interface EmailVerifitionSent {
open:boolean , onClose :()=>void,setRegistrationModal:(val:boolean)=>void,setLoginModal:(val:boolean)=>void, setVerifyEmailModal:(val:boolean)=>void ,setEmailVerifitionSentModal:(val:boolean)=>void
}

const AuthModal:React.FC<{type:string,to:string}> = ({type, to }) => {
  const [loginModal,setLoginModal] = useState<boolean>(false)
  const [registrationModal,setRegistrationModal] =useState<boolean>(false)
  const [VerifyEmailModal  , setVerifyEmailModal] = useState<boolean>(false)
  const [EmailVerifitionSentModal  , setEmailVerifitionSentModal] = useState<boolean>(false)
  useEffect(()=>{
    if(type=="Login"){
      setLoginModal(true)
    }
  },[])
  return (
    <>
         
          {loginModal&& <LoginForm  setRegistrationModal ={setRegistrationModal} setLoginModal ={setLoginModal} to={to}  open= {loginModal} onClose = {()=>setLoginModal(!loginModal)}/>}
          {registrationModal && <RegisterForm setVerifyEmailModal ={setVerifyEmailModal} setRegistrationModal ={setRegistrationModal} setLoginModal={setLoginModal} open= {registrationModal} onClose = {()=>setRegistrationModal(!registrationModal)}/>}
          {VerifyEmailModal && <VerifyEmailForm setEmailVerifitionSentModal = {setEmailVerifitionSentModal} setVerifyEmailModal ={setVerifyEmailModal} setRegistrationModal={setRegistrationModal} setLoginModal={setLoginModal} open= {VerifyEmailModal} onClose = {()=>setVerifyEmailModal(!VerifyEmailModal)}/>}
          {EmailVerifitionSentModal && <EmailVerifitionSent setEmailVerifitionSentModal = {setEmailVerifitionSentModal} setVerifyEmailModal ={setVerifyEmailModal} setRegistrationModal={setRegistrationModal} setLoginModal={setLoginModal} open= {VerifyEmailModal} onClose = {()=>setEmailVerifitionSentModal(!EmailVerifitionSentModal)}/>}
     
    </>
)
  
};
const LoginForm:React.FC<LoginForm> = ({open , onClose , to,setRegistrationModal,setLoginModal}) => {
  const authService = new AuthService()
  const router = useRouter()
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
      password:data.password
    }
    try {
      const response =  await authService.loginUser(payload)
      if(response.success){
        console.log(response)
        toast.success(response.message)
        setLoading(false)
        window.location.reload()
      }
    } catch (error:any) {
      setLoading(false)
      toast.error(error.message)
    }
   

  }  
  const openRegister =(value:boolean)=>{
    setRegistrationModal(value)
    setLoginModal(!value)
  }
  return (
    <Dialog  open={open} onOpenChange={onClose}>
       <Login control={control} handleSubmit={handleSubmit} modal ={true} errors={errors} openRegister = {openRegister} onSubmit = {onSubmit} loading={loading}/>
    </Dialog>
  );
};
const RegisterForm:React.FC<RegisterForm>= ({open , onClose,setLoginModal,setRegistrationModal , setVerifyEmailModal}) => {
  const [loading,setLoading] = useState<boolean>(false)

  const authService = new AuthService()
  const onSubmit: SubmitHandler<RegistrationInputs> =  async (data) => {
    setLoading(true)
    console.log("form submitted" , data)
    const payload = {
      username:data.username,
      password:data.password,
      email:data.email
    }
    try{
     const response =  await authService.registerUser(payload)
     if(response?.success){
      toast.success(response.message)
      reset()
      localStorage.setItem("email" ,response.email )
      setVerifyEmailModal(true)
     }
    }catch(err:any){
      setLoading(false)
      // resetField('email')
      toast.error(err.message)
    }finally{
      setLoading(false)
    }
  }
  const { control, handleSubmit, formState: { errors } , reset } = useForm<RegistrationInputs>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }

  }
  )
  
  const openModal =(value:string)=>{
    if(value=="Login"){
    setLoginModal(true)
    setRegistrationModal(false)
  }else if(value="VerifyEmail"){
    setVerifyEmailModal(true)
    setRegistrationModal(false)
  }
  }
  return (
    <Dialog open={open} onOpenChange={onClose} >
     <Register control={control} handleSubmit={handleSubmit} errors={errors} modal ={true} openModal = {openModal} onSubmit = {onSubmit} loading={loading}/>
    </Dialog>
  );
};
const VerifyEmailForm:React.FC<VerifyEmailFormValues> = ({setVerifyEmailModal ,setEmailVerifitionSentModal,setRegistrationModal,setLoginModal,open ,onClose})=>{
  type verifyEmailType = {
    email:string
  }
  const [loading,setLoading] = useState<boolean>(false)
  useEffect(()=>{
    const email = sessionStorage.getItem("email")
    sessionStorage.removeItem("email")
    if(email) reset({email})
  },[])

  const authService = new AuthService()
  const onSubmit: SubmitHandler<verifyEmailType> =  async (data) => {
    setLoading(true)
    console.log("form submitted" , data)
    const payload = {
      email:data.email
    }
    try{
     const response =  await authService.verifyEmailForm(payload)
    //  const response =  {
    //   success:"true",message:"link send"
    //  }
     if(response?.success){
      toast.success(response.message)
      reset()
      setVerifyEmailModal(false)
      setEmailVerifitionSentModal(true)
     }
    }catch(err:any){
      setLoading(false)
      // resetField('email')
      toast.error(err.message)
    }finally{
      setLoading(false)
    }
  }
  const { control, handleSubmit, formState: { errors } , reset } = useForm<verifyEmailType>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    }

  }
  )
  
  const openModal =(value:string)=>{
    if(value=="Login"){
    setLoginModal(true)
    setVerifyEmailModal(false)
  }else if(value="Registration"){
    setRegistrationModal(true)
    setVerifyEmailModal(false)
  }
  }
  return (
    <Dialog open={open} onOpenChange={onClose} >
     <VerifyEmail  control={control} handleSubmit={handleSubmit} errors={errors} modal ={true} openModal = {openModal} onSubmit = {onSubmit} loading={loading} />
    </Dialog>
  );
}
const EmailVerifitionSent:React.FC<EmailVerifitionSent> = ({open,onClose , setLoginModal , setVerifyEmailModal , setRegistrationModal , setEmailVerifitionSentModal})=>{
  const openModal =(value:string)=>{
    if(value=="Login"){
    setLoginModal(true)
    setEmailVerifitionSentModal(false)
  }else if(value="Reverify"){
    setVerifyEmailModal(true)
    setEmailVerifitionSentModal(false)
  }
  }
  return(
    <Dialog open={open} onOpenChange={onClose} >
        <Wrapper className='px-10 md:w-1/2 mt-10 h-[80vh] '>
        <Card onClick={(e)=>e.stopPropagation()} className="flex justify-center items-center h-96">
          <p><CircleCheck color="green" size={50} /></p>
        <p>Email verification Link is sent .kindly check your inbox</p>
        <div className="flex justify-between gap-4">
          <div className="border-b border-b-black cursor-pointer"  onClick={()=>openModal("Reverify")}>Re-verify Email</div>
          <div  className="border-b border-b-black cursor-pointer"  onClick={()=>openModal("Login")}>Login</div>
        </div>
        </Card>
        </Wrapper>
    </Dialog>
  )
}

export default AuthModal;
