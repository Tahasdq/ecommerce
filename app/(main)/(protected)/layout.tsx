"use client"
import AuthModal from "@/components/app/AuthModal/AuthModal";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AuthService from "@/services/auth.service";
import Spinner from "@/components/Spinner/Spinner";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";


export default function ProtectedLayout({ children }:{children:React.ReactNode}) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((value)=>value.user)
    
    
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggedIn,setisLogin]=useState(false)
    const [loading,setLoading]=useState(true)
    const getUser = async ()=>{
         try {
            setLoading(true)
            const authService = new AuthService()
            const result = await authService.isMe()
            if(result) {
                setisLogin(true)
                router.push(pathname)
                sessionStorage.setItem('userDetail' , JSON.stringify(result))
                dispatch(setUser(result.user))
                console.log("userp",user)
            }
        } catch (error) {
            setisLogin(false)
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(()=>{
     getUser()
    },[])

  if(loading) return <Spinner size={70} />

  if (!isLoggedIn) {
    return <AuthModal type="Login" to={pathname} />; 
  }

  return children;
}
