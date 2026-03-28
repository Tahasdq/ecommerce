"use client"
import React from "react";
import { Button } from "../ui/button";
import {  CardContent } from "../ui/card";
import { CountingNumber } from "../ui/shadcn-io/counting-number";
import Wrapper from "../app/Wrapper/Wrapper";
import hero from'@/assets/hero-homepage1.png'
import heroMed from'@/assets/hero-med.png'
import Container from "../app/Container/Container";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default function Hero() {

  return (
        <Wrapper className="flex flex-row justify-between relative overflow-hidden">
        <CardContent className="h-[1000px] md:h-[1000px] lg:h-screen">
          <section className="flex flex-col gap-10  justify-center w-full lg:w-3/5 ">
            <div className=" font-bold text-4xl md:text-6xl ">
              {" "}
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div className="flex justify-center">

           
            <Button className="rounded-4xl py-7 w-80 cursor-pointer" variant="default">
              <Link href={"/products"}>Shop now</Link>
            </Button>
             </div>
            <div>
              <div className="flex  sm:flex-row h-32 justify-center gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl">
                    <CountingNumber
                      number={22-1}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                      
                    />
                    <span>+</span>
                  </div>
                  
                  <div className=" w-full text-center text-md sm:text-xl md:text-2xl">Clients</div>
                </div>
                <Separator  orientation="vertical" className="bg-gray-400 w-2 h-full " />
                  <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl">
                    <CountingNumber
                      number={10-1}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                      
                    />
                    <span>+</span>
                  </div>
                  <div className="w-full text-center text-md sm:text-xl md:text-2xl">Countries</div>
                </div>
                <Separator  orientation="vertical" className=" bg-gray-400  "/>
                 <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl">
                    <CountingNumber
                      number={500-1}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                      
                    />
                    <span>+</span>
                  </div>
                  <div className=" w-full text-center text-md sm:text-xl md:text-2xl">Users</div>
                </div>
              </div>
            </div>
          </section>
          <section 
          style={{ backgroundImage: `url(${hero.src})` }}
          className={`hidden overflow-hidden lg:block right bg-cover absolute  lg:-top-[100px] lg:-right-30 bg-no-repeat bg-right w-[65%] h-[90%] `}>
          </section>
          <section 
          style={{ backgroundImage: `url(${heroMed.src})` }}
          className={` overflow-hidden lg:hidden  bg-cover  bg-no-repeat bg-center w-full h-[60%]`}>
          </section>
        </CardContent>
        </Wrapper>
  );
}
