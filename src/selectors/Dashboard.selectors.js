import { createSelector } from "@reduxjs/toolkit";
import { DashboardSlice } from "../reducers/Dashboard.slice";

const dashboard$ = (s) => s[DashboardSlice.name];

export const products$ = createSelector(dashboard$, (s) => s.products);

export const sales$ = createSelector(dashboard$, (s) => s.sales);

export const productsInCart$ = createSelector(dashboard$, (s) => s.cart);

export const countOfItems$ = createSelector(dashboard$, (s) => s.numberOfItems);

export const alert$ = createSelector(dashboard$, (s) => s.alert);

export const itemToBeSearch$ = createSelector(dashboard$, (s) => s.itemToBeSearch);
