"use client"
import { motion, Variants } from "motion/react";
import { ProductListing } from "@/components/home";
import Wrapper from "../Wrapper/Wrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

export const MiddleSection = ({ heading, productType, route }: { heading: string, productType: string, route: string }) => {
  const router = useRouter()
  const routeTo = () => {
    router.push(route)
  }

  return (
    <Wrapper className="py-20">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col gap-12"
      >
        <motion.div variants={itemVariants} className="flex justify-center">
          <h2 className="font-black text-4xl md:text-6xl text-center tracking-tight uppercase">
            {heading}
          </h2>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ProductListing />
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-center pt-4">
          <Button
            className="text-lg font-bold px-20 py-8 rounded-full border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-500 group"
            variant="outline"
            onClick={routeTo}
          >
            <span>View All</span>
            <motion.span 
              className="ml-2 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </Wrapper>
  );
}


