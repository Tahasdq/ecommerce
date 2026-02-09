"use client";
import Wrapper from "@/components/app/Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Counter } from "@/components/ui/shadcn-io/counter";
import { colors, sizes } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/hooks";
import { id, SelectedColor, SelectedSize } from "@/types/types";
import { Check } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { addToCart } from "@/lib/redux/features/cartSlice";
import ProductService from "@/services/product.service";
// import { products } from "@/components/home/ProductListing";

// const PRODUCT_PRICE = "1200";

export default function Product() {
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qauntity, setQuantity] = React.useState(1);


  

  const [error, setError] = useState({
    sizeSelectionError: false,
    colorSelctionError: false,
  });
  const params = useParams();
  const dispatch = useAppDispatch();

  const { productId } = params;

  const fetchProduct = async () => {
    const product = new ProductService();
    const productData = await product.getProductById(productId);
    setProduct(productData);
    console.log("productData", productData);
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
      product.price
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
    }
  };



  const handleSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? null : size));
  };

  const handleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? null : color));
  };

  return (
    <Card>
      <Wrapper className="flex flex-col md:flex-row">
        <CardContent className="w-full md:w-3/5">
          <div className="product-image relative rounded-3xl overflow-hidden cursor-pointer min-w-56 min-h-96 py-0">
            <Image
              src="https://next-ecommerce-shopco.vercel.app/images/header-res-homepage.png"
              alt="sample"
              fill
              objectFit="cover"
              className="hover:scale-110 transition-all duration-500 "
            />
          </div>
        </CardContent>
        <CardContent className="w-full md:w-4/5 flex gap-4 flex-col  mt-10 md:mt-0">
          <div className="flex justify-center md:justify-start ">
            <h2 className="font-bold text-3xl md:text-5xl">{product.name}</h2>
          </div>
          <div>
            {Array.from({ length: product.star }).map((star) => (
              <p>*</p>
            ))}
          </div>
          <div>{product.price} PKR</div>
          <p>{product.description}</p>
          <div className="flex flex-col gap-4">
            <div>Choose Colors</div>
            <div className="flex gap-4">
              {[...new Set(product?.variants?.map((v) => v.color))].map(
                (color) => {
                  const disabled = !availableColors.includes(color);

                  return (
                    <div
                      key={color}
                      onClick={() => !disabled && handleColor(color)}
                      style={{ backgroundColor: color }}
                      className={`h-10 w-10 rounded-full border-2 flex items-center justify-center cursor-pointer
          ${selectedColor === color ? "border-black" : "border-gray-300"}
          ${disabled ? "opacity-30 cursor-not-allowed" : ""}
        `}
                    >
                      {selectedColor === color && (
                        <Check size={22} color="white" />
                      )}
                    </div>
                  );
                },
              )}
               {error.colorSelctionError && <p>select color please</p>}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>Choose Size</div>
            <div className="flex gap-4">
              {[...new Set(product?.variants?.map((v) => v.size))].map(
                (size) => {
                  const disabled = !availableSizes.includes(size);

                  return (
                    <div
                      key={size}
                      onClick={() => !disabled && handleSize(size)}
                      className={`px-4 py-2 rounded-full border cursor-pointer
                      ${selectedSize === size ? "bg-black text-white" : "border-gray-300"}
                      ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                    `}
                    >
                      {size}
                    </div>
                  );
                },
              )}
              {error.sizeSelectionError && <p>select color please</p>}
            </div>
          </div>
          <div className="flex justify-between item ">
            <div>
              <Counter number={qauntity} setNumber={handleMinMaxChange} />
            </div>
            <Button
              onClick={addItemsToCart}
              className="px-20 sm:px-40 sm:py-5 md:px-20 md:py-6  lg:px-40  rounded-3xl cursor-pointer"
            >
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Wrapper>
    </Card>
  );
}
