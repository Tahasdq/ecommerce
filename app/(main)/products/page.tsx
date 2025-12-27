"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ColorButton from "@/components/ui/ColorButton";
// import Partition from "@/components/ui/Partition";
import { Separator } from "@/components/ui/separator";
import SizeButton from "@/components/ui/SizeButton";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronRight, SlidersVertical, Star } from "lucide-react";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";
export const products = [
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
      id: "1",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
      id: "2",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
      id: "3",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
      id: "4",
    },
  ];
const page = () => {
  const [priceRange, setPriceRange] = useState([300, 700]);
  const minLabelRef = useRef<any>(null);
  const maxLabelRef = useRef<any>(null);

  const trackRef = useRef<any>(null);

  useLayoutEffect(() => {
    setPriceRange([...priceRange]); // triggers correct position before first paint
  }, []);

  const handlePriceChange = (values:any) => {
    // Prevent crossing: enforce min <= max
    let [min, max] = values;

    if (min > max) min = max;
    if (max < min) max = min;
    setPriceRange([min, max]);
  };

  return (
    <Wrapper className="flex flex-col sm:flex-row border-2">
      <Card className="hidden sm:block sm:min-w-[250px] filters ">
        <CardHeader>
          <CardTitle className="text-2xl">Filter</CardTitle>
          <CardTitle className="col-start-2 row-span-2 row-start-1 self-center  justify-self-end items-center">
            <SlidersVertical size={20} />
          </CardTitle>
        </CardHeader>
        <Separator className="my-6 mx-6 !w-auto" />

        <CardContent className="px-6 flex flex-col gap-5">
          <div className="flex justify-between items-center cursor-pointer ">
            {/* Why bg-card not applying */}
            <div>Tshirt</div>
            <div className="flex items-center pt-1 ">
              <ChevronRight size={15} />
            </div>
          </div>
          <div className="flex justify-between items-center cursor-pointer">
            <div>Tshirt</div>
            <div className="flex items-center pt-1 ">
              <ChevronRight size={15} />
            </div>
          </div>
          <div className="flex justify-between items-center cursor-pointer">
            <div>Tshirt</div>
            <div className="flex items-center pt-1 ">
              <ChevronRight size={15} />
            </div>
          </div>
          <div className="flex justify-between items-center cursor-pointer">
            <div>Tshirt</div>
            <div className="flex items-center pt-1 ">
              <ChevronRight size={15} />
            </div>
          </div>
        </CardContent>
        <Separator className="my-6 mx-6 !w-auto" />

        <CardHeader>
          <CardTitle className="text-2xl">Price</CardTitle>
          <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
            <SlidersVertical size={20} />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6  relative  ">
          <div
            className="absolute top-4  text-black mx-7"
            style={{
              left: `${
                (priceRange[0] / 1000) * trackRef.current?.offsetWidth -
                (minLabelRef.current?.offsetWidth || 0) / 2
              }px`,
              transform: "translateX(-50%)",
            }}
            ref={minLabelRef}
          >
            {priceRange[0]}
          </div>
          <div ref={trackRef} className="w-full">
            <Slider
              max={1000}
              min={0}
              value={priceRange}
              onValueChange={handlePriceChange}
            />
          </div>

          <div
            className="absolute  top-4   text-black mx-7"
            style={{
              left: `${
                (priceRange[1] / 1000) * trackRef.current?.offsetWidth -
                (maxLabelRef.current?.offsetWidth || 0) / 2
              }px`,
              transform: "translateX(-50%)",
            }}
            ref={maxLabelRef}
          >
            {priceRange[1]}
          </div>
        </CardContent>
        <Separator className="my-15 mx-6 !w-auto" />
        <CardHeader>
          <CardTitle className="text-2xl">Size</CardTitle>
          <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
            <SlidersVertical size={20} />
          </CardTitle>
        </CardHeader>
        <Separator className="my-6 mx-6 !w-auto" />
        <CardContent className="px-6  relative  ">
          <div className="flex gap-4 flex-wrap">
            <SizeButton />
            <SizeButton />
            <SizeButton />
          </div>
        </CardContent>
        <Separator className="my-15 mx-6 !w-auto" />
        <CardHeader>
          <CardTitle className="text-2xl">Color</CardTitle>
          <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
            <SlidersVertical size={20} />
          </CardTitle>
        </CardHeader>
        <Separator className="my-4 mx-6 !w-auto" />
        <CardContent className="px-6  relative  ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <ColorButton />
              <ColorButton />
              <ColorButton />
            </div>
          </div>
        </CardContent>
        <div className="flex justify-center">
          <Button className="px-20  sm:py-5 md:py-6 my-10  rounded-3xl cursor-pointer ">
            Apply Filter
          </Button>
        </div>
      </Card>
      <div className="w-full sm:min-w-4/5 products border-4 flex flex-wrap gap-4 p-5">
      {
        products.map((item)=>(
           <Card
          className="min-w-70  max-h-[400px] min-h-[400px] py-0 border-0  shadow-none cursor-pointer"
        >
          <div className="product-image relative w-full h-full overflow-hidden  border-2 rounded-2xl ">
            <Image
              src="https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"
              alt="sample"
              fill
              objectFit="cover"
              className="hover:scale-110 transition-all duration-500 "
            />
          </div>
          <div className="product-description cursor-pointer flex flex-col gap-3">
            <div className="text-xl font-semibold">
              T shirt with Tape Details
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <Star
                  key={idx}
                  size={20}
                  className="text-orange-300 fill-orange-300"
                />
              ))}
            </div>
            <div className="text-xl font-semibold">$100</div>
          </div>
        </Card>
        ))
      }
       
        

      </div>
    </Wrapper>
  );
};

export default page;
