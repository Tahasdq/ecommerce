import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface item {
    id:string;
    name:string;
    color:string;
    size:string;
    price:number;
    quantity:number

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
      const { quantity, price, color ,size ,id } = action?.payload;
      console.log("action",action)
      // console.log(" action?.payload" ,  action?.payload)
      const totalPrice = quantity * (price)
      const itemExists = state.cartItems.some((item) => item.id === id && item.color ==color && item.size ==size);
      console.log("itemExists" , itemExists)
      if(itemExists){
      state.cartItems = state.cartItems.map((item) =>
        item.id == id ? {...item, quantity :item.quantity + quantity} :  item
      );}
      else{
        state.cartItems = [...state.cartItems , action.payload]
      }
      state.totalPrice += totalPrice;
    },
    deleteItemsFromCart : (state , action :PayloadAction<item>) =>{
      const {color,size, id} = action.payload
      const itemFound  = state.cartItems.find((item)=>(item.id == id && item.color ==color && item.size ==size))
      if(itemFound){
        state.cartItems = state.cartItems.filter((item)=>item !== itemFound)// matlab jo ye condition true karjai usko false krky remove krdo
      state.totalPrice= state.totalPrice - itemFound?.price
      }
    },
    updateCart : (state,action:PayloadAction<{id:string , quantity:number}>)=>{
      state.cartItems = state.cartItems.map((item)=>{
        if(item.id ==action.payload.id){
          return{...item  , quantity:Math.max(1,action.payload.quantity)}
        }
        return item
      })
    }
  },
});

export const {addToCart , deleteItemsFromCart , updateCart} = cartSlice.actions
export default cartSlice.reducer