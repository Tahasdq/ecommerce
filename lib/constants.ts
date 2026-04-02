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
       href:"/products?sales"
    },
    {
      name:"New Arrivals",
      trigger:false,
      href:"/products?newArrival"
    },
    {
      name:"Brands" ,
      trigger:false,
      href:"/products?brands"
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


export const orderStatus= [
  {name:"Created",value:"created"},
  {name:"Processing",value:"processing"},
  {name:"Shipped",value:"shipped"},
  {name:"Delivered",value:"delivered"},
  {name:"Cancelled",value:"cancelled"},
]  