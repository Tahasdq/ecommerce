import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${cn("w-full px-3 mx-auto  md:max-w-7xl  md:px-6 mt-20", className)}`}>
      {children}
    </div>
  );
};

export default Wrapper;
