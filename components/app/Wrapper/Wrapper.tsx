import { cn } from "@/lib/utils";
import React from "react";

const Wrapper = ({ children , className } : {children : React.ReactNode , className :string}) => {
  return <div className={`${cn("w-full max-w-7xl mx-auto px-6" ,className )}`}>{children}</div>;
};

export default Wrapper;
