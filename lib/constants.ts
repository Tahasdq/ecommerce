import { itemTypes } from "@/types/types";

export const items : itemTypes[] = [
    {
      name:"Shop",
      trigger:true,
      links :["Links"],
      href:"#"
    },
    {
      name:"On Sale",
       trigger:false,
       href:"#"
    },
    {
      name:"New Arrivals",
      trigger:false,
      href:"newArrival"
    },
    {
      name:"Brands" ,
      trigger:false,
      href:"#"
    }
  ]