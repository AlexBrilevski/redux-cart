import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartInitState = {
  items: [],
  itemsCount: 0,
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
      state.itemsCount++;

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
      state.itemsCount--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }
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
