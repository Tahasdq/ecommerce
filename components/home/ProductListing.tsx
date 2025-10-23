import Image from "next/image";
import { Card, CardContent } from "../ui/card";

export default function ProductListing() {
  const items = [
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
    },
    {
      description: "T shirt with Tape Details",
      star: "******",
      price: "19",
    },
  ];
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="flex gap-10 justify-center overflow-x-auto">
        {items?.map((item , idx) => (
          <Card key={idx} className="min-w-56 min-h-96 py-0">
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
        ))}
      </CardContent>
    </Card>
  );
}
