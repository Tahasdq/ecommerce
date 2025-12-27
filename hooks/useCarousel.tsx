import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import React from "react";

const useCarousel = ({ data }:any) => {
  return (
    <div className=" w-full px-15 sm:px-0">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative "
      >
        <CarouselContent>
          {data?.map((item:any, index:any) => (
            <CarouselItem
              key={index}
              className=" sm:basis-1/2 md:basis-1/3 lg:basis-1/4 "
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-start justify-center p-6 gap-5">
                    <div className="text-3xl font-semibold">{item.name}</div>
                    <div className="text-3xl font-semibold flex gap-1">
                      {/* {item.reviewStars} */}
                      {Array.from({ length: Number(item.reviewStars) }).map(
                        (_, idx) => (
                          <Star
                            key={idx}
                            size={20}
                            className="text-orange-300 fill-orange-300"
                          />
                        )
                      )}
                    </div>
                    <p className="text-sm  flex flex-wrap">"{item.notes}"</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default useCarousel;
