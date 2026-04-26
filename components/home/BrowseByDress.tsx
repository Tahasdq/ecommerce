"use client"
import { motion, Variants } from "motion/react";
import { useRouter } from "next/navigation";
import Wrapper from "../app/Wrapper/Wrapper";
import casualImg from "@/assets/casual.png";
import formalImg from "@/assets/formal_style.png";
import partyImg from "@/assets/party.png";
import gymImg from "@/assets/gym.png";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as const }
  }
};

export default function BrowseByDress() {
  const router = useRouter()
  const handleRoute = (route: string) => {
    return router.push(`/products?type=${route}`)
  }

  return (
    <Wrapper className="py-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="bg-[#F0F0F0] rounded-[60px] py-20 px-6 md:px-16 lg:px-24"
      >
        <motion.div variants={cardVariants} className="flex justify-center mb-16">
          <h2 className="font-black text-4xl md:text-6xl text-center uppercase tracking-tighter">
            Browse By Dress Style
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Casual */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onClick={() => handleRoute("casual")} 
            className="h-72 relative overflow-hidden md:col-span-4 bg-white rounded-4xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <motion.div
              style={{ backgroundImage: `url(${casualImg.src})` }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-2xl px-10 py-10 font-black uppercase italic tracking-tighter">Casual</div>
          </motion.div>

          {/* Formal */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onClick={() => handleRoute("formal")} 
            className="h-72 relative overflow-hidden md:col-span-8 bg-white rounded-4xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <motion.div
              style={{ backgroundImage: `url(${formalImg.src})` }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-2xl px-10 py-10 font-black uppercase italic tracking-tighter">Formal</div>
          </motion.div>

          {/* Party */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onClick={() => handleRoute("party")} 
            className="h-72 relative overflow-hidden md:col-span-8 bg-white rounded-4xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <motion.div
              style={{ backgroundImage: `url(${partyImg.src})` }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-2xl px-10 py-10 font-black uppercase italic tracking-tighter">Party</div>
          </motion.div>

          {/* Gym */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onClick={() => handleRoute("gym")} 
            className="h-72 relative overflow-hidden md:col-span-4 bg-white rounded-4xl cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <motion.div
              style={{ backgroundImage: `url(${gymImg.src})` }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 text-2xl px-10 py-10 font-black uppercase italic tracking-tighter">Gym</div>
          </motion.div>
        </div>
      </motion.div>
    </Wrapper>
  );
}



