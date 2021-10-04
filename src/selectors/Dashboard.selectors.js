import { createSelector } from "@reduxjs/toolkit";
import { DashboardSlice } from "../reducers/Dashboard.slice";

const dashboard$ = (s) => s[DashboardSlice.name];

export const products$ = createSelector(dashboard$, (s) => s.products);

export const sales$ = createSelector(dashboard$, (s) => s.sales);

export const productsInCart$ = createSelector(dashboard$, (s) => s.cart);

export const orders$ = createSelector(dashboard$, (s) => s.orders);

export const favoriteProducts$ = createSelector(dashboard$, (s) => s.favoriteProducts);

export const filters$ = createSelector(dashboard$, (s) => s.filters);

export const countOfItems$ = createSelector(dashboard$, (s) => s.numberOfItems);

export const alert$ = createSelector(dashboard$, (s) => s.alert);

export const itemToBeSearch$ = createSelector(dashboard$, (s) => s.itemToBeSearch);
