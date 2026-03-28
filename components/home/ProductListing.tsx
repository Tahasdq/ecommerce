"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { id } from "@/types/types";
import { Star } from "lucide-react";
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
  const router = useRouter();
  
  const navigateToProduct = (id : id) => {
    router.push(`product/${id}`);
  };
  return (
    <div className="flex  gap-10 overflow-x-auto  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center">
        {products?.map((item, idx) => (
          <Card
            key={idx}
            className="min-w-70  min-h-[400px] py-0 border-0  shadow-none cursor-pointer"
            onClick={() => navigateToProduct(item.id)}
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
              <div className="text-xl font-semibold">T shirt with Tape Details</div>
              <div className="flex gap-0.5">
                { [1,2,3,4,5].map((_,idx)=>(
                            <Star key={idx} size={20} className="text-orange-300 fill-orange-300" />
                          )
                )
                }
                </div>
              <div className="text-xl font-semibold">$100</div>
            </div>
          </Card>
        ))}
      </div>
  );
}
