"use client";
import Filter from "@/components/app/Filter/Filter";
import ProductCard from "@/components/app/ProductCard/ProductCard";
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
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";


const page = () => {
  const [products , setProducts]=useState<ProductFetched[]>([])
  const [loading ,setLoading]=useState(false)
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    fetchProducts()
  },[searchQuery])

  const fetchProducts = async (filters?: any) => {
    const productService = new ProductService()
    setLoading(true)
    try {
      let res;
      const combinedFilters = {
        ...filters,
        search: searchQuery || undefined
      };

      if (searchQuery || (filters && (filters.categories?.length > 0 || filters.sizes?.length > 0 || filters.minPrice !== 0 || filters.maxPrice !== 10000))) {
        res = await productService.getFilteredProducts(combinedFilters)
      } else {
        res = await productService.getProducts()
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

 

 
  
 

  return (
    <Wrapper className="flex flex-col sm:flex-row ">
      <Filter onFilterChange={handleFilterChange}/>
       <Card className="sm:min-w-4/5  border-y-2 rounded-t-lg">
      { 
      !loading ? 
       <div className="rounded-t-lg p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       { 
        products && products.map(product=>(<ProductCard product={product} />))
       }
       </div>:<div className="w-full h-screen flex justify-center items-center">
          <Spinner size={80}/>
          </div>
      }
      
      </Card>
    </Wrapper>
  );
};

export default page;
