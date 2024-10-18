// src/slices/ecommerceSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from '../../api/productApi'; // Update the path accordingly

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;  
    rating: {
        rate: number;
        count: number;
    };
    quantity: number; 
}

interface ProductState {
    products: Product[];   //[Product]
    cart: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    cart: [],
    loading: false,
    error: null,
};


export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
    return await productApi.fetchProducts(); 
});

const ecommerceSlice = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, count } = action.payload;
            const itemExists = state.cart.find(item => item.id === product.id);

            if (itemExists) {
                itemExists.quantity = count;
            } else {
                state.cart.push({ ...product, quantity: count }); 
            }
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload; 
            state.cart = state.cart.filter(item => item.id !== itemId);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed';
            });
    }
});

export const {addToCart,removeFromCart} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
