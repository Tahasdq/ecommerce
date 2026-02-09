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
      sizeName:"S"
    },
    { id:2,
      sizeName:"M"
    },
    {
      id:3,
      sizeName:"L"
    }
  ]
export const colors: SelectedColor[]= [
    {
      id:1,
      colorName:"red"
    },
    {
      id:2,
      colorName:"black"
    },
    {
      id:3,
      colorName:"green"
    }
  ] 