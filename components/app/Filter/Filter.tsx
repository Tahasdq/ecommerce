"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ColorButton from "@/components/ui/ColorButton";
import SizeButton from "@/components/ui/SizeButton";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight, SlidersVertical } from "lucide-react";
import React, { useLayoutEffect, useRef, useState } from "react";

const sizes = [
    {name:"Large" , value:"L" , key:1},
    {name:"Medium" , value:"M" , key:2},
    {name:"Small" , value:"S" , key:3},
  ]
const categories = [
    {key:1 ,name : "Women", value: "women"},
    {key:2 ,name : "Men", value: "men"},
    {key:3 ,name : "Kids", value: "kids"},
    {key:4 ,name : "Accessories", value: "accessories"},
    {key:5 ,name : "Footwear", value: "footwear"},
]  

interface FilterProps {
  onFilterChange?: (filters: any) => void;
}

const Filter = ({ onFilterChange }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState<any[]>([])
  const [selectedCategories, setSelectedCategories] = useState<any[]>([])

  useLayoutEffect(() => {
    setPriceRange([...priceRange]); // triggers correct position before first paint
  }, []);

  const minLabelRef = useRef<any>(null);
  const maxLabelRef = useRef<any>(null);

  const trackRef = useRef<any>(null);

  

  const handlePriceChange = (values: any) => {
    // Prevent crossing: enforce min <= max
    let [min, max] = values;

    if (min > max) min = max;
    if (max < min) max = min;
    setPriceRange([min, max]);
  };

  const handleClickSize = (size: any) => {
    if (selectedSizes.find(selectedSize => selectedSize.key == size.key)) { 
         setSelectedSizes((selectedSizes) => selectedSizes.filter((sz) => sz.key != size.key)) 
        return
    }
    setSelectedSizes((prev) => [...prev, size])
  }

  const handleCategories = (category: any) => {
    if (selectedCategories?.find((sc) => sc.key == category.key)) { 
        setSelectedCategories((selectedCategory) => selectedCategory.filter((sc) => sc.key != category.key)) 
        return
    }
    setSelectedCategories((prev) => [...prev, category])
  }

  const applyFilter = () => {
    const filterData = {
      categories: selectedCategories.map(cat => cat.value),
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sizes: selectedSizes.map(size => size.value)
    };
    
    if (onFilterChange) {
      onFilterChange(filterData);
    }
  }

  const resetFilter = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    
    const filterData = {
      categories: [],
      minPrice: 0,
      maxPrice: 1000,
      sizes: []
    };
    
    if (onFilterChange) {
      onFilterChange(filterData);
    }
  }

  return (
    <Card className="hidden sm:block sm:min-w-[250px] filters ">
      <CardHeader>
        <CardTitle className="text-2xl">Category</CardTitle>
        <CardTitle className="col-start-2 row-span-2 row-start-1 self-center  justify-self-end items-center">
          <SlidersVertical size={20} />
        </CardTitle>
      </CardHeader>
      <Separator className="my-6 mx-6 !w-auto" />

      <CardContent className="px-6 flex flex-col gap-5">
        {/* categories filter */}
        {categories.map((category) => (
          <div
            key={category.key}
            onClick={() => handleCategories(category)}
            className={cn("flex justify-between items-center cursor-pointer p-2 rounded-sm " , selectedCategories?.find((sc) => sc.key == category.key) ? "bg-black text-white" : null)}
          >
            {/* Why bg-card not applying */}
            <div>{category.name}</div>
            <div className="flex items-center pt-1 ">
              <ChevronRight size={15} />
            </div>
          </div>
        ))}
      </CardContent>
      <Separator className="my-6 mx-6 !w-auto" />

      <CardHeader>
        <CardTitle className="text-2xl">Price</CardTitle>
        <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
          <SlidersVertical size={20} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6  relative  ">
        <div
          className="absolute top-4  text-black mx-7"
          style={{
            left: `${
              (priceRange[0] / 1000) * trackRef.current?.offsetWidth -
              (minLabelRef.current?.offsetWidth || 0) / 2
            }px`,
            transform: "translateX(-50%)",
          }}
          ref={minLabelRef}
        >
          {priceRange[0]}
        </div>
        <div ref={trackRef} className="w-full">
          <Slider
            max={1000}
            min={0}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
        </div>

        <div
          className="absolute  top-4   text-black mx-7"
          style={{
            left: `${
              (priceRange[1] / 1000) * trackRef.current?.offsetWidth -
              (maxLabelRef.current?.offsetWidth || 0) / 2
            }px`,
            transform: "translateX(-50%)",
          }}
          ref={maxLabelRef}
        >
          {priceRange[1]}
        </div>
      </CardContent>
      <Separator className="my-15 mx-6 !w-auto" />
      <CardHeader>
        <CardTitle className="text-2xl">Size</CardTitle>
        <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
          <SlidersVertical size={20} />
        </CardTitle>
      </CardHeader>
      <Separator className="my-6 mx-6 !w-auto" />
      <CardContent className="px-6  relative  ">
        <div className="flex gap-4 flex-wrap">
          {sizes.map((size) => (
            <div key={size.key} onClick={() => handleClickSize(size)}>
              <SizeButton
                sizeKey={size.key}
                name={size.name}
                selectedSizes={selectedSizes}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <Separator className="my-15 mx-6 !w-auto" />
      {/* <CardHeader>
        <CardTitle className="text-2xl">Color</CardTitle>
        <CardTitle className="col-start-2 row-span-2 row-start-1 self-center justify-self-end items-center">
          <SlidersVertical size={20} />
        </CardTitle>
      </CardHeader>
      <Separator className="my-4 mx-6 !w-auto" />
      <CardContent className="px-6  relative  ">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <ColorButton />
            <ColorButton />
            <ColorButton />
          </div>
        </div>
      </CardContent> */}
      <div className="flex flex-col gap-1  ">
        <Button onClick={applyFilter} className="px-20  sm:py-5 md:py-6 my-3 mx-3 rounded-3xl cursor-pointer ">
          Apply Filter
        </Button>
        <Button onClick={resetFilter} variant="outline" className="px-10  sm:py-5 md:py-6 my-3 mx-3 rounded-3xl cursor-pointer ">
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default Filter;
