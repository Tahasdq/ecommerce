"use client"
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const SizeButton = ({name , selectedSizes,sizeKey}:{name:string}) => {
  const selectedSize = selectedSizes?.find((sc)=>sc.key==sizeKey )? "bg-black text-white":""

  return (
    <div
      className={cn("flex justify-center items-center  border-black border-2 rounded-full  px-4 py-2 cursor-pointer ", `${selectedSize}`)}
    >
      {name}
    </div>
  );
};

export default SizeButton;
