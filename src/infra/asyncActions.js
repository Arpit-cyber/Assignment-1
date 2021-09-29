import { createAsyncThunk } from '@reduxjs/toolkit';
import { CART_URL, PRODUCT_URL, SALES_URL } from '../constants';
import { doAsync } from './doAsync';

export const fetchProducts = createAsyncThunk(
    'products',
    async (thungArgs) =>  await doAsync({
            url: PRODUCT_URL,
            ...thungArgs,
        })
);

export const fetchSales = createAsyncThunk(
    'sales',
    async (thungArgs) =>  await doAsync({
            url: SALES_URL,
            ...thungArgs,
        })
);

export const fetchCart = createAsyncThunk(
    'cart',
    async (thungArgs) =>  await doAsync({
            url: CART_URL,
            ...thungArgs,
        })
);

export const addToCart = createAsyncThunk(
    'addToCart',
    async (product, thunkArgs) =>
        await doAsync({
            url: CART_URL,
            method: 'post',
            body: product,
            ...thunkArgs,
        }),
);

export const removeFromCart = createAsyncThunk(
    'removeFromCart',
    async (productId, thunkArgs) =>
        await doAsync({
            url: `${CART_URL}/${productId}`,
            method: 'delete',
            ...thunkArgs,
        }),
);
