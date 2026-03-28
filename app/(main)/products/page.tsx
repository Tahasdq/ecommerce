"use client";
import Filter from "@/components/app/Filter/Filter";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import Spinner from "@/components/Spinner/Spinner";
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
import ProductService from "@/services/product.service";
import { ProductFetched } from "@/types/product.type";
import { Check, ChevronRight, SlidersVertical, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";


const page = () => {
  const router = useRouter()
  const [products , setProducts]=useState<ProductFetched[]>([])
  const [loading ,setLoading]=useState(false)

  useEffect(() => {
    fetchProducts()
  },[])

  const fetchProducts = async (filters?: any) => {
    const productService = new ProductService()
    setLoading(true)
    try {
      let res;
      if (filters && (filters.categories.length > 0 || filters.sizes.length > 0 || filters.minPrice !== 0 || filters.maxPrice !== 1000)) {
        res = await productService.getFilteredProducts(filters)
      } else {
        res = await productService.getProducts()
        console.log("res",res)
      }
      setProducts(res.data)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: any) => {
    fetchProducts(filters)
  }

 

 
  
  const navigateToProduct = (id:string)=>{
    router.push(`/product/${id}`)
  }

  return (
    <Wrapper className="flex flex-col sm:flex-row ">
      <Filter onFilterChange={handleFilterChange}/>
       <Card className="sm:min-w-4/5  border-y-2 rounded-t-lg">
      { 
      !loading ? 
      <div className="rounded-t-lg p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       { products.length > 0 ? products.map((item)=>(
        <Card
          key={item._id}
          className="w-full  h-[450px] py-0  shadow-none cursor-pointer "
          onClick={()=>navigateToProduct(item._id)}
          >
          <div className="product-image relative w-full h-full overflow-hidden rounded-xl">
            <Image
              src={`https://res.cloudinary.com/dvonwxpnl/image/upload/f_auto,q_auto,w_300,h_300,c_fill/${item.imagePublicId}.jpg`}
              alt="sample"
              fill
              objectFit="cover"
              className="hover:scale-110 transition-all duration-500 "
            />
          </div>
          <div className="product-description cursor-pointer flex flex-col gap-3 p-3">
            <div className="text-xl font-semibold">
              {item.name}
            </div>
            <div className="flex gap-0.5">
              {Array.from({length: Number(item?.star)}).map((_, idx) => (
                <Star
                  key={idx}
                  size={20}
                  className="text-orange-300 fill-orange-300"
                />
              ))}
            </div>
            <div className="text-xl font-semibold">Rs{item.price}</div>
          </div>
        </Card>
        )) : <div className="w-full flex justify-center items-center text-xl text-gray-500">
          No products found
        </div>}
      </div>
      : <div className=" w-full h-full flex justify-center items-center">
          <Spinner size={60}/>
          </div>
      }
      </Card>
    </Wrapper>
  );
};

export default page;
