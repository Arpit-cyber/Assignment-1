import { createSelector } from '@reduxjs/toolkit';
import { FETCH_CART, FETCH_PRODUCTS, FETCH_SALES } from '../../constants';
import { LoaderSlice } from './reducer';

const busyIndicatorState$ = (s) => s[LoaderSlice.name];

export const isProductLoading$ = createSelector(busyIndicatorState$, (s) => Boolean(s[FETCH_PRODUCTS]));

export const isSalesLoading$ = createSelector(busyIndicatorState$, (s) => Boolean(s[FETCH_SALES]));

export const isCartLoading$ = createSelector(busyIndicatorState$, (s) => Boolean(s[FETCH_CART]));
