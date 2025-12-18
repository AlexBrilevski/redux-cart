import { createSlice } from "@reduxjs/toolkit";

const uiInitState = {
  isCartOpen: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'cart',
  initialState: uiInitState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
