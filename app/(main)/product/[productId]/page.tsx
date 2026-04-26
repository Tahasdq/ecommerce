"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { colors, sizes } from "@/lib/constants";
import { useAppDispatch } from "@/lib/redux/hooks/hooks";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/lib/redux/features/cartSlice";
import ProductService from "@/services/product.service";
import { buildCloudinaryUrl } from "@/lib/helpers";
import { EMPTY_PRODUCT } from "@/types/product.type";
import Spinner from "@/components/Spinner/Spinner";
import { Separator } from "@radix-ui/react-separator";
import { toast } from "sonner";
// import { products } from "@/components/home/ProductListing";

// const PRODUCT_PRICE = "1200";

export default function Product() {
  const [product, setProduct] = useState(EMPTY_PRODUCT);
  const [selectedColor, setSelectedColor] = useState<string | null>("");
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [qauntity, setQuantity] = React.useState(1);
  const [loading, setLoading] = useState(false);


  

  const [error, setError] = useState({
    sizeSelectionError: false,
    colorSelctionError: false,
  });
  const params = useParams();
  const dispatch = useAppDispatch();

  const { productId } = params;

  const fetchProduct = async () => {
    try {
      setLoading(true);
    const product = new ProductService();
    const productData = await product.getProductById(productId);
    setProduct(productData.data);
    console.log("productData", productData);}
    catch (err) {
      console.error("Error fetching product:", err);
    } finally { 
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // checking if product user hit on url is correct or not
  // const validProduct = products.find((product)=>product.id==String(productId))
  // if(!validProduct){
  //   return notFound()
  // }

  const selectedVariant = product?.variants?.find(
    (v: any) => v.color === selectedColor && v.size === selectedSize,
  );
  const availableColors = selectedSize
    ? product.variants
        .filter((v) => v.size === selectedSize)
        .map((v) => v.color)
    : product?.variants?.map((v) => v.color);

  const availableSizes = selectedColor
    ? product.variants
        .filter((v) => v.color === selectedColor)
        .map((v) => v.size)
    : product?.variants?.map((v) => v.size);

  const handleMinMaxChange = (newValue: number) => {
   
    if(!validateItems()){
      return 
    }
    const maxProductUSerCanAdd = selectedVariant?.stock
    if(!maxProductUSerCanAdd){
      return 
    }
    setQuantity(Math.max(1, Math.min(maxProductUSerCanAdd, newValue)));
  };

  // validating color and size exist when hitting addItemsToCart method
  const validateItems = () => {
    console.log("selectedSize",selectedSize)
    if ((selectedSize)?.length ===0  || selectedSize==null) {
      setError((error) => ({ ...error, sizeSelectionError: true }));
      return false
    }
    if ((selectedColor)?.length === 0 || selectedColor==null) {
      setError((error) => ({ ...error, colorSelctionError: true }));
      return false
    }
    return true
  };
  const addItemsToCart = () => {
    validateItems();
    console.log("selectedColor", selectedColor);
    console.log("selectedSize", selectedSize);
    console.log("SelectedQuantity", qauntity);
    if (
      selectedSize &&
      selectedColor &&
      qauntity &&
      product.price &&
      selectedVariant?._id
    ) {
      const payload = {
        id: String(productId),
        name: String(product.name),
        size: selectedSize,
        color: selectedColor,
        price: Number(product.price),
        quantity: Number(qauntity),
        variantId: selectedVariant._id,
        stock:selectedVariant.stock
      };
      dispatch(addToCart(payload));
      toast.success("Items added to cart")
    }
  };

  const handleSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? null : size));
    setError((prev) => ({ ...prev, sizeSelectionError: false }));
  };

  const handleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
    setError((prev) => ({ ...prev, colorSelctionError: false }));
  };
  const ImageUrl =  buildCloudinaryUrl(product?.imagePublicId)

  return (
    <div className="bg-white">
      {!loading ? (
        <Wrapper className="py-10 md:py-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden bg-[#F0EEED] group shadow-sm hover:shadow-xl transition-all duration-500">
                <Image
                  src={ImageUrl}
                  alt={product?.name || "product"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className="space-y-4">
                <h1 className="font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter leading-tight">
                  {product?.name}
                </h1>
                
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={`${i < Math.floor(Number(product.star) || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">({product.star}/5)</span>
                </div>

                <div className="text-3xl md:text-4xl font-bold tracking-tight">
                  {product.price} PKR
                </div>

                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                  {product.description || "Experience the perfect blend of style and comfort with our latest collection."}
                </p>
              </div>

              <Separator className="bg-gray-100" />

              {/* Colors */}
              <div className="space-y-4">
                <div className="flex  justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Select Colors</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[...new Set(product?.variants?.map((v) => v.color))].map((color) => {
                    const disabled = !availableColors.includes(color);
                    return (
                      <div
                        key={color}
                        onClick={() => !disabled && handleColor(color)}
                        style={{ backgroundColor: color }}
                        className={`h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 transform active:scale-90
                          ${selectedColor === color ? "ring-2 ring-offset-2 ring-black border-black scale-110" : "border-gray-200"}
                          ${disabled ? "opacity-20 cursor-not-allowed grayscale" : "hover:scale-110 hover:shadow-md"}
                        `}
                      >
                        {selectedColor === color && (
                          <Check size={18} className={color.toLowerCase() === 'white' || color.toLowerCase() === '#ffffff' ? "text-black" : "text-white"} />
                        )}
                      </div>
                    );
                  })}
                </div>
                {error.colorSelctionError && <span className="text-red-500 text-xs font-bold animate-pulse">Please select a color</span>}

              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Choose Size</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[...new Set(product?.variants?.map((v) => v.size))].map((size) => {
                    const disabled = !availableSizes.includes(size);
                    return (
                      <div
                        key={size}
                        onClick={() => !disabled && handleSize(size)}
                        className={`px-8 py-3 rounded-full border-2 text-sm font-bold transition-all duration-300 transform active:scale-95 cursor-pointer
                          ${selectedSize === size ? "bg-black text-white border-black shadow-lg" : "bg-[#F0F0F0] text-gray-500 border-transparent hover:border-black/20"}
                          ${disabled ? "opacity-20 cursor-not-allowed border-dashed" : "hover:scale-105"}
                        `}
                      >
                        {size}
                      </div>
                    );
                  })}
                  </div>
                  {error.sizeSelectionError && <span className="text-red-500 text-xs font-bold animate-pulse">Please select a size</span>}
              </div>

              <Separator className="bg-gray-100" />

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                <div className="w-full sm:w-auto">
                  <Counter number={qauntity} setNumber={handleMinMaxChange} />
                </div>
                <Button
                  onClick={addItemsToCart}
                  className="w-full sm:flex-1 bg-black text-white py-8 rounded-full text-lg font-bold hover:bg-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Wrapper>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner size={60} />
        </div>
      )}
    </div>
  );
}

