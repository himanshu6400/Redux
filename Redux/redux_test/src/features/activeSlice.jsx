import { createSlice } from '@reduxjs/toolkit'
const initialState = { 
    active: false,
    count:0,
    image:'',
}
export const activeSlice = createSlice({
    name: 'active',
    initialState,
    reducers: { 
        setActive: (state) =>{ 
            state.active = true 
        }, 
        unSetActive: (state) =>{
            state.active = false 
        }, 
        incrementCount: (state) =>{
            state.count +=  1
        }, 
        decrementCount : (state) =>{
            state.count -= 1
        },
    },
}) 

export const { setActive, unSetActive, incrementCount, decrementCount } = activeSlice.actions 
export default activeSlice.reducer