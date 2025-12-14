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
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;

export default store;
