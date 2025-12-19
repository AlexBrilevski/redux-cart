import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

const endpointUrl = 'https://react-products-database-e5f44-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

export const fetchCartData = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(endpointUrl);

      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }

      return response.json();
    };

    try {
      const cartData = await sendRequest();

      dispatch(cartActions.setCartItems({
        items: cartData.items || [],
        itemsCount: cartData.itemsCount
      }));
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Fetching cart data failed!'
      }));
    }
  };
};

export const storeCartData = (cart) => {
  return async (dispatch) => {
    dispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data.'
    }));

    const sendRequest = async () => {
      const response = await fetch(endpointUrl, {
        method: 'PUT',
        body: JSON.stringify({ items: cart.items, itemsCount: cart.itemsCount }),
      });

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
