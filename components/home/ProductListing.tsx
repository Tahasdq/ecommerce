"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { useRouter } from "next/navigation";
import { id } from "@/types/types";
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
    <Card className="border-0 shadow-none">
      <CardContent className="flex gap-10 justify-center overflow-x-auto">
        {products?.map((item, idx) => (
          // <Link href={`product/${item.id}`}>
          <Card
            key={idx}
            className="min-w-56 min-h-96 py-0"
            onClick={() => navigateToProduct(item.id)}
          >
            <div className="product-image relative w-full h-full overflow-hidden cursor-pointer">
              <Image
                src="https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"
                alt="sample"
                fill
                objectFit="cover"
                className="hover:scale-110 transition-all duration-500 "
              />
            </div>
            <div className="product-description">
              <div>T shirt with Tape Details</div>
              <div>****</div>
              <div>price</div>
            </div>
          </Card>
          // </Link>
        ))}
      </CardContent>
    </Card>
  );
}
