import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  numberOfItems: {},
  alert: "",
};

export const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setProducts(s, a) {
      s.products = a.payload || initialState.products;
    },
    addToCart(s, a) {
      s.cart = a.payload
        ? s.cart.every((e) => e.id !== a.payload.id)
          ? [...s.cart, a.payload]
          : s.cart
        : initialState.cart;
    },
    removeFromCart(s, a) {
      s.cart = a.payload
        ? s.cart.filter((e) => e.id !== a.payload)
        : initialState.cart;
    },
    countOfItems(s, a) {
      s.numberOfItems = a.payload
        ? { ...s.numberOfItems, ...a.payload }
        : initialState.numberOfItems;
    },
    removeCountOfItems(s, a) {
      delete s.numberOfItems[a.payload];
    },
    setAlert(s, a) {
      s.alert = a.payload || initialState.alert;
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  countOfItems,
  removeCountOfItems,
  setAlert,
} = DashboardSlice.actions;
