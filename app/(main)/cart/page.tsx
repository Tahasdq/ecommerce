"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { deleteItemsFromCart, item, updateCart } from "@/lib/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";
import axios from "axios";
import {  MoveRight, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Cart() {
  const data = useAppSelector((state)=>state.cartReducer)
  const dispatch = useAppDispatch()

  const {cartItems ,totalPrice } = data

  const handleQuantity = (id:string,newValue: number,variantId:string) => {
    // setQuantity((quantity)=>quantity.map((item)=>(
    //   item.id==id? {...item , quantity : Math.max(1 , newValue) }: item
    // )))
    dispatch(updateCart({id,quantity:newValue,variantId}))
  }
  const deleteItems = (arg:item)=>{
    console.log("arg" , arg)
    dispatch(deleteItemsFromCart(arg))
  }
  const handleCheckout  =  async() =>{
    try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_LOCAL}/api/payment` ,  { withCredentials: true })
      window.location.href = res.data.url;
    } catch(error){
       alert("Checkout failed")
    }
  }
 

  return (
    <Card>
      <Wrapper className="flex flex-col items-start gap-10">
        { cartItems.length >0 ? 
          <>
          <div className="flex justify-center px-6">
          <h2 className="font-bold text-3xl md:text-5xl">your cart</h2>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <CardContent className="w-full md:w-2.5/5">
            {
             cartItems && cartItems?.map((item)=>{
                  return(
            <Card className="py-3">
              <CardContent className="flex gap-3">
                <div className="flex-1 product-image relative rounded-3xl overflow-hidden cursor-pointer min-w-20 min-h-20 py-0">
                  <Image
                    src="https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"
                    alt="sample"
                    fill
                    objectFit="cover"
                    className="hover:scale-110 transition-all duration-500 "
                  />
                </div>
                <div className="flex-2">
                  <div className="text-sm">Product Name: {item.name}</div>
                  <div>Size: {item.size}</div>
                  <div>Color: {item.color}</div>
                  <div>Cost: {item.price * item.quantity}</div>
                </div>
                <div className="flex-1  flex flex-col justify-between">
                  <div className="flex justify-end">
                    <Trash onClick={()=>deleteItems(item)} className="cursor-pointer" />
                  </div>
                  <Counter
                    buttonProps={{ size: "sm" }}
                    number={item.quantity}
                    setNumber={(value)=>handleQuantity(item.id , value , item.variantId)}
                    className="flex justify-center"
                  />
                </div>  
              </CardContent>
            </Card>
                  )
              })
              }
          </CardContent>
          <CardContent className="w-full md:w-2.5/5 flex gap-4 flex-col  mt-10 md:mt-0">
            <div className="flex justify-start ">
              <h2 className="font-bold text-2xl md:text-3xl">Order Summary</h2>
            </div>
            <div className="flex  flex-col justify-between gap-5 ">
              <div className="flex flex-row justify-between">
                <div>Subtotal</div>
                <div>{totalPrice}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Delivery Free</div>
                <div>$0</div>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-row justify-between font-bold">
                <div>Total</div>
                <div>{totalPrice}</div>
              </div>
              <Button onClick={handleCheckout } className="cursor-pointer  sm:px-40 sm:py-5 md:px-20 md:py-6  lg:px-40  rounded-3xl  flex justify-center items-center gap-2">
                <div className="text-xl">Add to cart</div>
                  <MoveRight size={50} className="!w-20 h-10!"  />
              </Button>
            </div>
          </CardContent>
        </div>
        </> : 
        <p>not items found</p>
        }
      </Wrapper>
    </Card>
  );
}
