import { createSlice } from "@reduxjs/toolkit";

const uiInitState = {
  isCartOpen: false,
};

const uiSlice = createSlice({
  name: 'cart',
  initialState: uiInitState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
