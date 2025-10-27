"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { colors, sizes } from "@/lib/constants";
import { id, SelectedColor, SelectedSize } from "@/types/types";
import { Check } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";


export default function Product() {

  const [qauntity, setQuantity] = React.useState(1);
  const params = useParams();


  const handleMinMaxChange = (newValue: number) => {
    setQuantity(Math.max(1, Math.min(10, newValue)));
  };
 
  
  const [selectedColor,setSelectedColor] = useState<SelectedColor>({})
  const [selectedSize,setSelectedSize] = useState<SelectedSize>({})
  const handleColor  = (id:id)=>{
     if(!id) return
    const foundColor = colors.find((color)=>color.id ==id)
    setSelectedColor({})
    if(foundColor){
      setSelectedColor(foundColor)
    }
  }
  const handleSize  = (id:id)=>{
    if(!id ) return
   const foundSizes =  sizes.find((size)=>size?.id==id)
   setSelectedSize({}) // isn't needed because its already replacing entire selected object
   if(foundSizes){
   setSelectedSize(foundSizes)
   }
  }
  const addItemsToCart = ()=>{
    console.log("selectedColor" , selectedColor)
    console.log("selectedSize" , selectedSize)
    console.log("SelectedQuantity" , qauntity)
  }

  return (
    <Card>
      <Wrapper className="flex flex-col md:flex-row">
        <CardContent className="w-full md:w-3/5">
          <div className="product-image relative rounded-3xl overflow-hidden cursor-pointer min-w-56 min-h-96 py-0">
            <Image
              src="https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"
              alt="sample"
              fill
              objectFit="cover"
              className="hover:scale-110 transition-all duration-500 "
            />
          </div>
        </CardContent>
        <CardContent className="w-full md:w-4/5 flex gap-4 flex-col  mt-10 md:mt-0">
          <div className="flex justify-center md:justify-start ">
            <h2 className="font-bold text-3xl md:text-5xl">
              T-shirt with Tape Details
            </h2>
          </div>
          <div>******</div>
          <div>$120</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            cupiditate explicabo sequi consectetur maxime? Excepturi magnam
            officiis voluptatem, ut repudiandae atque veritatis labore
            distinctio. Iure ea perferendis soluta labore tempore
          </p>
          <div className="flex flex-col gap-4">
            <div>Choose Colors</div>
            <div className="flex gap-4">
             {colors?.map((color , idx)=>(
                <div onClick={()=>handleColor(color.id ?? "")} key={idx} className={`flex justify-center items-center  border-black border-2 rounded-full  h-10 w-10  bg-${color.colorName} cursor-pointer`}>{color?.id==selectedColor?.id?<Check size="30px" color="white"/> : null}</div>
             )) }
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>Choose Size</div>
            <div className="flex gap-4">
             {sizes?.map((size)=>(
                <div onClick={()=>handleSize(size.id ?? "")} key={size.id} className={`flex justify-center items-center  border-black border-2 rounded-full  px-4 py-2 cursor-pointer ${size.id==selectedSize?.id ? "bg-black text-white" : ""}`}>{size.sizeName}</div>
             )) }
            </div>
          </div>
          <div className="flex justify-between item ">
            <div>
              {" "}
              <Counter number={qauntity} setNumber={handleMinMaxChange} />
            </div>
            <Button onClick={addItemsToCart} className="px-20 sm:px-40 sm:py-5 md:px-20 md:py-6  lg:px-40  rounded-3xl cursor-pointer">
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Wrapper>
    </Card>
  );
}
