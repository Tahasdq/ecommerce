"use client"
import AuthModal from "@/components/app/AuthModal/AuthModal";
import { useEffect, useLayoutEffect, useState } from "react";
import AuthService from "@/services/auth.service";
import Spinner from "@/components/Spinner/Spinner";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }) {
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
