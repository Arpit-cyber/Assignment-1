import { createSlice } from "@reduxjs/toolkit";
import { FETCH_CART, FETCH_PRODUCTS, FETCH_SALES } from "../constants";

const initialState = { 
    [FETCH_PRODUCTS]: 0,
    [FETCH_CART]: 0,
    [FETCH_SALES]: 0
 };

export const LoaderSlice = createSlice({
    name: 'Loader',
    initialState,
    reducers: {
        increaseLoader(s, a) {
            console.log('a.payload ', a.payload);
            if(a.payload) s[a.payload] = (s[a.payload] || 0) + 1
            else s.global = (s.global || 0) + 1
        },
        decreaseLoader(s, a) {
            if(a.payload) {
                const currentValue = s[a.payload];
    
                if (!currentValue) console.warn('Decremented an empty Loader');
    
                s[a.payload] = (currentValue || 1) - 1;
            } else s.global = (s.global || 1) - 1
        }
    }
});

export const { increaseLoader, decreaseLoader } = LoaderSlice.actions;
