import { createAsyncThunk } from '@reduxjs/toolkit';
import { CART_URL, FETCH_CART, FETCH_PRODUCTS, FETCH_SALES, PRODUCT_URL, SALES_URL } from '../constants';
import { doAsync } from './doAsync';

export const fetchProducts = createAsyncThunk(
    'products',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: PRODUCT_URL,
            loaderName: FETCH_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
);

export const fetchSales = createAsyncThunk(
    'sales',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: SALES_URL,
            loaderName: FETCH_SALES,
            ...thungArgs,
            ...thunkAPI
        })
);

export const fetchCart = createAsyncThunk(
    'cart',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: CART_URL,
            loaderName: FETCH_CART,
            ...thungArgs,
            ...thunkAPI
        })
);

export const addToCart = createAsyncThunk(
    'addToCart',
    async (product, thungArgs, thunkAPI) =>
        await doAsync({
            url: CART_URL,
            method: 'post',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const removeFromCart = createAsyncThunk(
    'removeFromCart',
    async (productId, thunkArgs, thunkAPI) =>
        await doAsync({
            url: `${CART_URL}/${productId}`,
            method: 'delete',
            ...thunkArgs,
            ...thunkAPI
        }),
);
