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
import { Check, ChevronRight, SlidersVertical, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";


const page = () => {
  const router = useRouter()
  const [products , setProducts]=useState([])
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
      }
      setProducts(res)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: any) => {
    fetchProducts(filters)
  }

 

 
  
  const navigateToProduct = (id)=>{
    router.push(`/product/${id}`)
  }

  return (
    <Wrapper className="flex flex-col sm:flex-row border-2">
      <Filter onFilterChange={handleFilterChange}/>
      <div className="w-full sm:min-w-4/5 products border-4 flex flex-wrap gap-4 p-5">
      { !loading ? 
        products.length > 0 ? products.map((item)=>(
           <Card
          key={item._id}
          className="min-w-70  max-h-[400px] min-h-[400px] py-0 border-0  shadow-none cursor-pointer"
          onClick={()=>navigateToProduct(item._id)}
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
              {item.name}
            </div>
            <div className="flex gap-0.5">
              {Array.from({length: item?.star}).map((_, idx) => (
                <Star
                  key={idx}
                  size={20}
                  className="text-orange-300 fill-orange-300"
                />
              ))}
            </div>
            <div className="text-xl font-semibold">{item.price}$</div>
          </div>
        </Card>
        )) : <div className="w-full flex justify-center items-center text-xl text-gray-500">
          No products found
        </div>
      : <div className=" w-full flex justify-center items-center">
          <Spinner size={60}/>
          </div>
      }
      </div>
    </Wrapper>
  );
};

export default page;
