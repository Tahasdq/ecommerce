"use client"
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "../ui/button";
import { CardContent } from "../ui/card";
import { CountingNumber } from "../ui/shadcn-io/counting-number";
import Wrapper from "../app/Wrapper/Wrapper";
import hero from '@/assets/hero-homepage1.png'
import heroMed from '@/assets/hero-med.png'
import { Separator } from "../ui/separator";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <Wrapper className="flex flex-row justify-between relative overflow-hidden" >
      <div ref={containerRef} className="w-full">
        <CardContent className="h-[1000px] md:h-[1000px] lg:h-screen relative">
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
            style={{ y: yText }}
            className="flex flex-col gap-10 justify-center w-full lg:w-3/5 z-10 relative"
        >
          <motion.div 
            variants={fadeInUp}
              className="font-bold text-4xl md:text-6xl"
          >
              FIND CLOTHES THAT MATCHES YOUR STYLE
          </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-600">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense
            of style.
          </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <Button className="rounded-4xl py-7 w-80 cursor-pointer shadow-lg hover:shadow-xl transition-shadow" variant="default">
                <Link href={"/products"}>Shop now</Link>
            </Button>
          </motion.div>
          
            <motion.div variants={fadeInUp}>
              <div className="flex sm:flex-row h-32 justify-center lg:justify-start gap-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl font-bold">
                    <CountingNumber
                      number={21}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  <span>+</span>
                  </div>
                  <div className="w-full text-center text-md sm:text-xl md:text-2xl text-gray-500">Clients</div>
                </div>
                <Separator orientation="vertical" className="bg-gray-200 w-px h-full" />
                <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl font-bold">
                    <CountingNumber
                      number={9}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  <span>+</span>
                  </div>
                  <div className="w-full text-center text-md sm:text-xl md:text-2xl text-gray-500">Countries</div>
                </div>
                <Separator orientation="vertical" className="bg-gray-200 w-px h-full" />
                <div className="flex flex-col items-center gap-3">
                  <div className="text-2xl sm:text-4xl md:text-6xl font-bold">
                    <CountingNumber
                      number={499}
                      inView={true}
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  <span>+</span>
                </div>
                  <div className="w-full text-center text-md sm:text-xl md:text-2xl text-gray-500">Users</div>
              </div>
            </div>
          </motion.div>
        </motion.section>

          <motion.div 
            style={{ 
              backgroundImage: `url(${hero.src})`,
              y: yBackground 
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={`hidden lg:block absolute lg:top-0 lg:right-0 bg-no-repeat bg-cover bg-right w-[60%] h-full z-0`}
            />
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ backgroundImage: `url(${heroMed.src})` }}
            className={`overflow-hidden lg:hidden bg-cover bg-no-repeat bg-center w-full h-[60%] mt-10`}
          />
      </CardContent>
      </div>
    </Wrapper>
  );
}


