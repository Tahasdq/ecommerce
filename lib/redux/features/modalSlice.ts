import { createSlice } from "@reduxjs/toolkit"

const initialState={
    loginModal:false
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        setModal:(state , action)=>{
                const {loginModal} = action.payload
                
                state.loginModal =loginModal
        },
    }
})

export const{setModal } = modalSlice.actions
export default  modalSlice.reducer