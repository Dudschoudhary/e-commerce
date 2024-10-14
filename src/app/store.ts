import { configureStore } from '@reduxjs/toolkit'
import ecommerceSliceReducer from '../features/ecommerce/ecommerceSlice'

export const store = configureStore({
  reducer: {
    products : ecommerceSliceReducer,   
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch