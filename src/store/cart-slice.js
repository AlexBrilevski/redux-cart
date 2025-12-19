import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartInitState = {
  items: [],
  itemsCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitState,
  reducers: {
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

export const storeCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data.'
    }));

    const sendRequest = async () => {
      const response = await fetch('https://react-products-database-e5f44-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();

      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Cart data stored successfully.'
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!'
      }));
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
