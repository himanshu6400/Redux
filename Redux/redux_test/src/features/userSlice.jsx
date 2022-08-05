import { createSlice } from '@reduxjs/toolkit'
const initialState = { 
    email:'', 
    name:'', 
    mobile:'',
} 

export const userSlice = createSlice({ 
    name: 'user_info', 
    initialState, 
    reducers: { 
        setUserInfo:(state, action) =>{ 
            state.email = action.payload.email 
            state.name = action.payload.name 
            state.mobile = action.payload.mobile 
        }, 
        unSetUserInfo:(state, action) =>{ 
            state.email = action.payload.email 
            state.name = action.payload.name 
            state.mobile = action.payload.mobile   
        }, 
    }, 
}) 

export const { setUserInfo, unSetUserInfo } = userSlice.actions 
    
export default userSlice.reducer