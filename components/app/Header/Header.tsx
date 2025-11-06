"use client"
import React from "react";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CircleUserRound, Menu, ShoppingCart } from "lucide-react";
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
import { useAppSelector } from "@/lib/redux/hooks/hooks";
import { useRouter } from "next/navigation";



const Header = () => {
  const {toggleSidebar} = useSidebar()
  const router = useRouter()
 
  const cartItems = useAppSelector((state)=>state.cartReducer.cartItems)
  const cartItemsLength  = cartItems.length
  return (
    <Card className="  rounded-none">
      <Wrapper className="flex flex-row justify-between">
        <CardContent className="flex flex-row items-center gap-2   ">
          <Menu className="md:hidden cursor-pointer" onClick={toggleSidebar} />
          <Image width={70} height={60} alt="logo" src={logo} />
          <Navbar className="hidden  md:block" />
        </CardContent>
        <CardContent className="flex flex-row gap-7 relative  items-center">
          <SearchBar />
          <div onClick={()=> router.push("/cart")} className="relative ">
           <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute left-4 -top-3">
            {cartItemsLength}
           </Badge>
            <ShoppingCart  size={24} className=" cursor-pointer" />
          </div>
          <CircleUserRound   size={30} className="inline-block cursor-pointer" /> {/* need to understadn this shit no matter what??? */}
          
        </CardContent>
      </Wrapper>
    </Card>
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
