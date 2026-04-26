"use client";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const navigateToProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <>
      {product && (
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Card
            key={product._id}
            className="w-full h-full flex flex-col border-none shadow-none bg-transparent cursor-pointer group"
            onClick={() => navigateToProduct(product._id)}
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-[#F0EEED]">
              <Image
                src={`https://res.cloudinary.com/dvonwxpnl/image/upload/f_auto,q_auto,w_400,h_533,c_fill/${product.imagePublicId}.jpg`}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Quick View Overlay (Optional style) */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-2 pt-4 px-1">
              <h3 className="text-lg md:text-xl font-bold line-clamp-1 group-hover:text-black/70 transition-colors uppercase tracking-tight">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(Number(product?.star) || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-400">
                  {product.star}/5
                </span>
              </div>

              <div className="text-xl md:text-2xl font-black mt-1">
                Rs {product.price.toLocaleString()}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
}
