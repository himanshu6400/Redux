import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/UserAuthApi'
import activeReducer from '../features/activeSlice'
import authReducer from '../features/authSlice'
import user_infoReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    active:activeReducer,
    auth:authReducer,
    // user_info:user_infoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)