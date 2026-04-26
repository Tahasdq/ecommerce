"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CircleUserRound, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { items } from "@/lib/constants";
import SearchBar from "../SearchBar/SearchBar";
import Wrapper from "../Wrapper/Wrapper";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";
import { usePathname, useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import AuthModal from "../AuthModal/AuthModal";
import { setModal } from "@/lib/redux/features/modalSlice";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";



const Header = () => {
  const {toggleSidebar} = useSidebar()
  const [toggleAuth,setToogleAuth]= useState(false)
   const { user, checkAuth } = useAuth();
   const pathname = usePathname()
   console.log("user",user)

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const router = useRouter()
 
  const cartItems = useAppSelector((state)=>state.cart.cartItems)
  const cartItemsLength  = cartItems.length


  
 
  const logout = async ()=>{
    console.log("logout called")
    // sessionStorage.removeItem('persist:root')
    await fetch("/api/logout" ,  { method: "POST" });
    router.push("/")
    await checkAuth()
    toast.success("Logout")
  }

  const redirectToCart =  async ()=>{
      router.push("/cart")
  }
  // const onClose = (value)=>{
  //   setToogleAuth(false)
  // }
  return (
    <div onClick={()=>setToogleAuth(false)}  className="sticky top-0 z-100 bg-white/70 backdrop-blur-sm transition-colors duration-300">
      <Wrapper className={`flex flex-row justify-between  z-10 mt-0 py-5 h-auto`}>
        <CardContent className="flex flex-row items-center gap-2">
          <Menu className="md:hidden cursor-pointer" onClick={toggleSidebar} />
          <Link href={"/"}>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter">SHOP.CO</h2>
          </Link> 
          <Navbar className="hidden  md:block" />
        </CardContent>
        <CardContent className="flex flex-row relative  items-center justify-center gap-7 ">
          <SearchBar />
          <div onClick={redirectToCart} className="relative  cursor-pointer! flex  gap-3">   {/* why ()=> not working   */}
           <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute left-4 -top-3">
            {cartItemsLength}
           </Badge>
            <ShoppingCart  size={24} className=" cursor-pointer" />
         
        </div>
        {
          user ?
          <>
          <div className="flex">
          <LogOut onClick={logout}   size={24} className="inline-block cursor-pointer" /> </div>
          <div className="flex"><User onClick={()=>router.push("/user-details")} size={24}  className="cursor-pointer"/> </div>
          </>:<div onClick={(e)=>{setToogleAuth(true); e.stopPropagation()} } className="text-xs md:min-w-25 cursor-pointer"><Link   href="/"></Link >Sign In/Sign Up</div>
        }
        </CardContent>

      </Wrapper>
        { toggleAuth &&

      
         <AuthModal
        type="Login"
        to="/"
        />
        }
      </div>
  );
};

export default Header;

export const Navbar = (props : { className:string} ) => {
  const { className } = props;
  
  return (
    <div className={`${className}`}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items?.map((item, index) => {
            return (
              <NavigationMenuItem key={index}>
                {item.trigger ? (
                  <NavigationMenuTrigger>{item?.name}</NavigationMenuTrigger>
                ) : null}
                {item.trigger ? (
                  <NavigationMenuContent>
                   {item.links?.map((link,index)=> <NavigationMenuLink key={index}>{link}</NavigationMenuLink>)}
                  </NavigationMenuContent>
                ) : (
                  <NavigationMenuLink asChild><Link href={item?.href ?? ""}>{item?.name}</Link></NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
