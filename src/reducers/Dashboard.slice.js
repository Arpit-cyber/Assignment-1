import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, fetchFavoriteProducts, fetchOrders, fetchProducts, fetchSales } from "../infra";

const initialState = {
  products: [],
  cart: [],
  numberOfItems: {},
  alert: "",
  sales: [],
  itemToBeSearch: "",
  orders: [],
  favoriteProducts: []
};

export const DashboardSlice = createSlice({
  name: "Dashboard",
  initialState,
  reducers: {
    setProducts(s, a) {
      s.products = a.payload || initialState.products;
    },
    setSales(s, a) {
      s.sales = a.payload || initialState.sales;
    },
    setSearchItem(s, a) {
      s.itemToBeSearch = a.payload || initialState.itemToBeSearch;
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
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (s, a) => {
      s.products = a.payload;
    });
    builder.addCase(fetchSales.fulfilled, (s, a) => {
      s.sales = a.payload;
    });
    builder.addCase(fetchCart.fulfilled, (s, a) => {
      s.cart = a.payload;
    });
    builder.addCase(fetchOrders.fulfilled, (s, a) => {
      s.orders = a.payload;
    });
    builder.addCase(fetchFavoriteProducts.fulfilled, (s, a) => {
      s.favoriteProducts = a.payload;
    });
  }
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  countOfItems,
  removeCountOfItems,
  setAlert,
  setSales,
  setSearchItem
} = DashboardSlice.actions;
