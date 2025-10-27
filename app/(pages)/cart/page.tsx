"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Counter } from "@/components/ui/shadcn-io/counter";
import {  MoveRight, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


export default function Cart() {

  
  const [qauntity, setQuantity] = useState(1);
  const handleMinMaxChange = (newValue: number) => {
    setQuantity(Math.max(1, Math.min(10, newValue)));
  };
  console.log("cart page");
  return (
    <Card>
      <Wrapper className="flex flex-col items-start gap-10">
        <div className="flex justify-center px-6">
          <h2 className="font-bold text-3xl md:text-5xl">your cart</h2>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <CardContent className="w-full md:w-2.5/5">
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
                  <div className="text-sm">Polo shirt</div>
                  <div>Size: large</div>
                  <div>Color: green</div>
                  <div>Cost: $180</div>
                </div>
                <div className="flex-1  flex flex-col justify-between">
                  <div className="flex justify-end">
                    <Trash className="cursor-pointer" />
                  </div>
                  <Counter
                    buttonProps={{ size: "sm" }}
                    number={qauntity}
                    setNumber={handleMinMaxChange}
                    className="flex justify-center"
                  />
                </div>  
              </CardContent>
            </Card>
          </CardContent>
          <CardContent className="w-full md:w-2.5/5 flex gap-4 flex-col  mt-10 md:mt-0">
            <div className="flex justify-start ">
              <h2 className="font-bold text-2xl md:text-3xl">Order Summary</h2>
            </div>
            <div className="flex  flex-col justify-between gap-5 ">
              <div className="flex flex-row justify-between">
                <div>Subtotal</div>
                <div>$180</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Delivery Free</div>
                <div>$180</div>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-row justify-between font-bold">
                <div>Total</div>
                <div>$180</div>
              </div>
              <Button className="cursor-pointer  sm:px-40 sm:py-5 md:px-20 md:py-6  lg:px-40  rounded-3xl  flex justify-center items-center gap-2">
                <div className="text-xl">Add to cart</div>
                  <MoveRight size={50} className="!w-20 h-10!"  />
              </Button>
            </div>
          </CardContent>
        </div>
      </Wrapper>
    </Card>
  );
}
