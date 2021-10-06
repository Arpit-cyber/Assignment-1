import { createAsyncThunk } from '@reduxjs/toolkit';
import { FAVORITE_PRODUCTS_URL, FETCH_FAVORITE_PRODUCTS } from '../constants';
import { doAsync } from './util/doAsync';

export const fetchFavoriteProducts = createAsyncThunk(
    'fetchFavoriteProducts',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: FAVORITE_PRODUCTS_URL,
            loaderName: FETCH_FAVORITE_PRODUCTS,
            ...thungArgs,
            ...thunkAPI
        })
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
