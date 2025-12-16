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
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      console.log(existingItem);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      console.log(existingItem);
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
