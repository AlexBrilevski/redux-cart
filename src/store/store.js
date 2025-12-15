import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartInitState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    addToCart(state, action) {
      state.items = [...state.items, { ...action.payload, quantity: 1 }];
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;

export default store;
