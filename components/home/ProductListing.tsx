"use client";
import ProductCard from "../app/ProductCard/ProductCard";
import Spinner from "@/components/Spinner/Spinner";
import { ProductFetched } from "@/types/product.type";
import { useEffect, useState } from "react";
import ProductService from "@/services/product.service";
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
export default function ProductListing() {
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
  
  
  
  return (
    <div className="flex  gap-10 overflow-x-auto  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center">
       { 
             !loading ? 
              <>
              { 
               products && products.map(product=>(<div className="min-w-70"><ProductCard  product={product} /></div>))
              }
              </>
                 :<Spinner size={80}/>
             }
      </div>
  );
}
