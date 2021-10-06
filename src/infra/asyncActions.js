import { createAsyncThunk } from '@reduxjs/toolkit';
import { CART_URL, FAVORITE_PRODUCTS_URL, FETCH_CART, FETCH_FAVORITE_PRODUCTS, FETCH_ORDERS, FETCH_PRODUCTS, FETCH_SALES, FETCH_VIEWED_PRODUCTS, ORDERS_URL, PRODUCT_URL, SALES_URL, VIEWED_PRODUCT_URL } from '../constants';
import { doAsync } from './doAsync';

export const fetchProducts = createAsyncThunk(
    'products',
    async (filters = {}, thungArgs, thunkAPI) =>  {
        const qs = Object.keys(filters).length ? `?_page=${filters.page}&_limit=${filters.limit}` : '';

        return await doAsync({
            url: `${PRODUCT_URL}${qs}`,
            loaderName: FETCH_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
    }
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

export const fetchViewedProducts = createAsyncThunk(
    'fetchViewedProducts',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: VIEWED_PRODUCT_URL,
            loaderName: FETCH_VIEWED_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
);

export const fetchOrders = createAsyncThunk(
    'orders',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: ORDERS_URL,
            loaderName: FETCH_ORDERS,
            ...thungArgs,
            ...thunkAPI
        })
);

export const fetchFavoriteProducts = createAsyncThunk(
    'fetchFavoriteProducts',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: FAVORITE_PRODUCTS_URL,
            loaderName: FETCH_FAVORITE_PRODUCTS,
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

export const viewedProduct = createAsyncThunk(
    'viewedProduct',
    async (product, thungArgs, thunkAPI) =>
        await doAsync({
            url: VIEWED_PRODUCT_URL,
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

export const placeOrder = createAsyncThunk(
    'placeOrder',
    async (order, thungArgs, thunkAPI) =>
        await doAsync({
            url: ORDERS_URL,
            method: 'post',
            body: order,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const markFavorite = createAsyncThunk(
    'markFavorite',
    async (product, thungArgs, thunkAPI) =>
        await doAsync({
            url: FAVORITE_PRODUCTS_URL,
            method: 'post',
            body: product,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const removeFavorite = createAsyncThunk(
    'removeFavorite',
    async (id, thungArgs, thunkAPI) =>
        await doAsync({
            url: `${FAVORITE_PRODUCTS_URL}/${id}`,
            method: 'delete',
            ...thungArgs,
            ...thunkAPI
        }),
);
