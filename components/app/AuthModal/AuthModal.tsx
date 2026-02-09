"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDescription } from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import AuthButton from "../Auth/AuthButton";
import { SubmitHandler } from "react-hook-form";
import AuthService from "@/services/auth.service";
import { redirect, usePathname, useRouter } from "next/navigation";
import { LoginInputs } from "@/components/auth/Login";
import Login from "@/components/auth/Login"
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";
import { setModal } from "@/lib/redux/features/modalSlice";

const AuthModal = ({type, to}) => {
  const [loginModal,setLoginModal] = useState(false)
  useEffect(()=>{
    if(type=="Login"){
      setLoginModal(true)
    }
  },[])
  return (
    <>
         {loginModal&& <LoginForm to={to}  open= {loginModal} onClose = {()=>setLoginModal(!loginModal)}/>}
          {/* {openRegistrationForm && <RegisterForm open= {showAuthModal} onClose = {()=>setShowAuthModal(!showAuthModal)}/>} */}
     
    </>
)
  
};
const LoginForm = ({open , onClose , to}) => {
  const authService = new AuthService()
  const router = useRouter()
    const [loading,setLoading] = useState<Boolean>(false)
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
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
       <Login onSubmit = {onSubmit} loading={loading}/>
    </Dialog>
  );
};
const RegisterForm = ({open , onClose}) => {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <form>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Register Form</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AuthModal;
