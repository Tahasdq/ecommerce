import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkDomainOfScale } from "recharts/types/util/ChartUtils";

export interface item {
    variantId:string
    id:string;
    name:string;
    color:string;
    size:string;
    price:number;
    quantity:number,
    stock?:number

}
interface stateData {
    cartItems : item[]
    totalPrice:number
}

const initialState :  stateData = {
      cartItems: [],
      totalPrice: 0,
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<item>) => {
      const { quantity, price ,id,variantId,stock } = action?.payload;
      const totalPrice = quantity * (price)
      const itemExists = state.cartItems.some((item) => item.variantId == variantId );
      const maxStock = stock
      if(!maxStock){console.log("stock not found")
        return
      }
      const cartProductQuantity = state.cartItems.find((item)=>item.variantId == variantId)?.quantity ?? 0;
      if(cartProductQuantity+quantity>maxStock){
          alert(`You already have ${cartProductQuantity} items in the cart. Only ${maxStock} are available in total`);
          return
      }
      if(quantity>maxStock){
         alert(`You already have ${cartProductQuantity} items in the cart. Only ${maxStock} are available in total`);
         return
      }
      if(itemExists){
      state.cartItems = state.cartItems.map((item) =>
        item.id == id && item.variantId==variantId ? {...item, quantity :item.quantity + quantity} :  item
      );}
      else{
        state.cartItems = [...state.cartItems , action.payload]
      }
      console.log("totalPrice" , totalPrice)
      state.totalPrice += totalPrice;
    },
    deleteItemsFromCart : (state , action :PayloadAction<item>) =>{
      const { variantId ,id} = action.payload
      const itemFound  = state.cartItems.find((item)=>item.variantId==variantId && item.id==id)

      if(itemFound){
      state.cartItems = state.cartItems.filter((item)=>item !== itemFound)// matlab jo ye condition true karjai usko false krky remove krdo
      console.log(itemFound?.price *itemFound?.quantity)
      state.totalPrice= state.totalPrice - (itemFound?.price *itemFound?.quantity)
      }
    },
    updateCart : (state,action:PayloadAction<{id:string , quantity:number , variantId:string,stock:number}>)=>{
      const{id , variantId,quantity,stock} = action.payload
      const itemId = id
      const itemQuantity = quantity //new value for quanitity
      if(!stock){return}

      const maxStock = stock
      const cartProductQuantity = state.cartItems.find((item)=>item.variantId == variantId)?.quantity ?? 0;
      if(cartProductQuantity+ itemQuantity>maxStock){
         return alert(`Only ${maxStock} item${maxStock > 1 ? "s" : ""} available in stock`);
      }
      if(quantity>maxStock){
        return alert(`Only ${maxStock} item${maxStock > 1 ? "s" : ""} available in stock`);
      }

      state.cartItems = state.cartItems.map((item)=>{
        if(item.id ==itemId && item.variantId ==variantId){
          if(itemQuantity > item.quantity){ //if its greater just increase it by an item price
            state.totalPrice= state.totalPrice + item.price
            
          }else if (itemQuantity < item.quantity){
             //if its less just reduce it by an item price
             state.totalPrice= state.totalPrice - (itemQuantity==0 ? 0: item.price) //if it give 1 just use 0 instead of item price otherwise it will go negative
          }
          return{...item  , quantity:Math.max(1,itemQuantity==item.quantity?item.quantity:itemQuantity)} // quanity cannot be less than 1
        }
        return item
      })

    }
  },
});

export const {addToCart , deleteItemsFromCart , updateCart} = cartSlice.actions
export default cartSlice.reducer