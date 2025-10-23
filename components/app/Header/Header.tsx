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

const Header = () => {
  const {toggleSidebar} = useSidebar()
  return (
    <Card className="  rounded-none">
      <Wrapper className="flex flex-row justify-between">
      <CardContent className="flex flex-row items-center gap-2   ">
        <Menu className="md:hidden cursor-pointer"  onClick={toggleSidebar}/>
        <Image width={70} height={60} alt="logo" src={logo} />
        <Navbar className="hidden  md:block" />
      </CardContent>
      <CardContent className="flex flex-row gap-7 relative  items-center">
        <SearchBar/>      
        <ShoppingCart className="w-7 h-7 md:h-10 md:w-10 cursor-pointer"  />
        <CircleUserRound className="w-7 h-7 md:h-10 md:w-10 cursor-pointer"/>
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
