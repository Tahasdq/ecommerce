import { itemTypes, SelectedColor, SelectedSize } from "@/types/types";

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

export const sizes : SelectedSize[] = [
    {id:1,
      sizeName:"small"
    },
    { id:2,
      sizeName:"medium"
    },
    {
      id:3,
      sizeName:"large"
    }
  ]
export const colors: SelectedColor[]= [
    {
      id:1,
      colorName:"black"
    },
    {
      id:2,
      colorName:"red-400"
    },
    {
      id:3,
      colorName:"green-700"
    }
  ] 