"use client"
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Counter } from "../ui/shadcn-io/counter";
import { CountingNumber } from "../ui/shadcn-io/counting-number";

export default function Hero() {
const [number2, setNumber2] = React.useState(1000);

  return (
    <div>
      <Card>
        <CardContent>
          <section className="flex flex-col gap-6">
            <div className=" font-bold text-4xl">
              {" "}
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <Button className="rounded-4xl py-7" variant="default">
              Shop Now
            </Button>
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
          <section className="right bg">iamge</section>
        </CardContent>
      </Card>
    </div>
  );
}
