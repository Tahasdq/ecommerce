"use client"
import { ProductListing } from "@/components/home";
import Wrapper from "../Wrapper/Wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export const   MiddleSection = ({heading , productType , route}:{heading:string , productType :string , route :string }) =>{
    const router = useRouter()
    const routeTo = ()=>{
        router.push(route)
    }
  return (
    <Wrapper className="flex flex-col  gap-10  ">
      <div className="flex justify-center">
        <h2 className="font-bold text-3xl md:text-5xl">{heading}</h2>
      </div>
      <div>
        {/* <ProductListing  type = {productType}/> */}
        <ProductListing  />
      </div>
      <div className="flex justify-center">
          <Button
            className=" text-md cursor-pointer px-20 py-7 hover:bg-black hover:text-white rounded-4xl"
            variant="outline"
            onClick={routeTo}
          >
            View all
            </Button>
      </div>
    </Wrapper>
  );
}
