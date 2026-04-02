import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({product}:{product:any}){
    const router = useRouter()
     const navigateToProduct = (id:string)=>{
    router.push(`/product/${id}`)
  }
    return (
        <>
        { product && <Card
                  key={product._id}
                  className="w-full  h-[450px] py-0  shadow-none cursor-pointer "
                  onClick={()=>navigateToProduct(product._id)}
                  >
                  <div className="product-image flex-1 relative w-full h-full overflow-hidden rounded-xl">
                    <Image
                      src={`https://res.cloudinary.com/dvonwxpnl/image/upload/f_auto,q_auto,w_300,h_400,c_fill/${product.imagePublicId}.jpg`}
                      alt="sample"
                      fill
                      objectFit="cover"
                      className="hover:scale-110 transition-all duration-500 "
                    />
                  </div>
                  <div className="product-description cursor-pointer flex flex-col gap-3 p-3">
                    <div className="text-xl font-semibold text-wrap line-clamp-1">
                      {product.name}
                      {/* {"Urban Techwear Bomber Jacket Game Game GameGame Game  Game  Game Game Game Game   Game "} */}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({length: Number(product?.star)}).map((_, idx) => (
                        <Star
                          key={idx}
                          size={20}
                          className="text-orange-300 fill-orange-300"
                        />
                      ))}
                    </div>
                    <div className="text-xl font-semibold">Rs{product.price}</div>
                  </div>
                </Card> }
        </>
    )
}
