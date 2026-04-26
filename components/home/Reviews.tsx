"use client"
import { motion } from "motion/react";
import Wrapper from "../app/Wrapper/Wrapper";
import ReviewsCarousel from "./ReviewsCarousel";

export default function Reviews() {
  const data = [
    {
      id: 1,
      name: "Taha",
      reviewStars: 2,
      notes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?"
    },
    {
      id: 2,
      name: "Taha",
      reviewStars: 4,
      notes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?"
    },
    {
      id: 3,
      name: "Taha",
      reviewStars: 5,
      notes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?"
    },
    {
      id: 4,
      name: "Taha",
      reviewStars: 2,
      notes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?"
    },
    {
      id: 5,
      name: "Taha",
      reviewStars: 6,
      notes: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur animi, nam dignissimos tempore vel beatae fugit nostrum officiis repudiandae laborum repellat ut nulla exercitationem magni autem, minus nobis quibusdam non?"
    },
  ]
  return (
    <Wrapper className="flex flex-col gap-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <h2 className="font-bold text-3xl md:text-5xl uppercase tracking-tight">Our Happy Customers</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ReviewsCarousel data={data} />
      </motion.div>
    </Wrapper>
  );
}

