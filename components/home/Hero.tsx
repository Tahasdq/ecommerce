"use client"
import React from "react";
import { Button } from "../ui/button";
import {  CardContent } from "../ui/card";
import { CountingNumber } from "../ui/shadcn-io/counting-number";
import Wrapper from "../app/Wrapper/Wrapper";
import hero from'@/assets/hero-homepage.png'
import Container from "../app/Container/Container";

export default function Hero() {

  return (
        <Wrapper className="flex flex-row justify-between">
        <CardContent className="flex flex-col  gap-10 md:flex-row md:items-center md:justify-center h-screen">
          <section className="flex flex-col gap-6  justify-center w-full md:w-3/5 ">
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

           
            <Button className="rounded-4xl py-7 w-80 " variant="default">
              Shop Now
            </Button>
             </div>
            <div>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="flex flex-col items-center gap-3">
                  <div>
                    <CountingNumber
                      number={1000}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                    <span>+</span>
                  </div>
                  <div>international brands</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div>
                    <CountingNumber
                      number={1000}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                    <span>+</span>
                  </div>
                  <div>international brands</div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div>
                    <CountingNumber
                      number={1000}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                    <span>+</span>
                  </div>
                  <div>international brands</div>
                </div>
              </div>
            </div>
          </section>
          <section 
          style={{ backgroundImage: `url(${hero.src})` }}
          className={`right bg-cover bg-center bg-no-repeat  w-full md:w-2/5 h-full `}>
          </section>
        </CardContent>
        </Wrapper>
  );
}
