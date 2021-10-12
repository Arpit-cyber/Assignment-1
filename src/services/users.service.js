import { createAsyncThunk } from '@reduxjs/toolkit';
import { USERS_URL } from '../constants';
import { doAsync } from './util/doAsync';

export const fetchAllUsers = createAsyncThunk(
    'fetchAllUsers',
    async (thungArgs, thunkAPI) =>  await doAsync({
            url: USERS_URL,
            ...thungArgs,
            ...thunkAPI
        })
);

export const register = createAsyncThunk(
    'register',
    async (user, thungArgs, thunkAPI) =>
        await doAsync({
            url: USERS_URL,
            method: 'post',
            body: user,
            ...thungArgs,
            ...thunkAPI
        }),
);

export const updateUser = createAsyncThunk(
    'updateUser',
    async ({ id, user }, thungArgs, thunkAPI) =>
        await doAsync({
            url: `${USERS_URL}/${(id)}`,
            method: 'put',
            body: user,
            ...thungArgs,
            ...thunkAPI
        }),
);
