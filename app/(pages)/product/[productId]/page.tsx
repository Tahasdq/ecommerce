"use client"
import { useParams } from "next/navigation"

export default function Product() {
  const params = useParams()
  console.log("productId:", params.productId)
  return <div>
    
  </div>
}