import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const userintialState = {
    email:"",
    _id :"", 
    role:"",
    createdAt:"",
    phone:"",
    name:"",
    fullName:""
}
const userSlice = createSlice({
    name:"user",
    initialState:userintialState,
    reducers:{
        setUser:(state,action)=>{
          console.log("action.payload",action.payload)
          const {email ,_id ,role } =   action.payload
          // state = {
          //   email,_id, role
          // }
          // state.email = email
          // state._id = _id
          // state.role= role
          // console.log("state" , state)
        Object.keys(state).forEach((s)=>{
                 Object.keys(action.payload).forEach((newItem)=>{
                    if(newItem ==s){
                        state = {
                            ...state ,
                             [s]:action.payload[s]
                            }
                    }
                })      
          })
          console.log("state",state)
          return state
        //   return {
        //       email ,_id ,role
        //   }
        }
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer