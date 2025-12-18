import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let isInit = true;

function App() {
  const cart = useSelector(state => state.cart);
  const isCartOpen = useSelector(state => state.ui.isCartOpen);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const storeCartData = async () => {
      dispatch(uiActions.showNotification({
        status: 'pending', 
        title: 'Sending...', 
        message: 'Sending cart data.'
      }));

      const response = await fetch('https://react-products-database-e5f44-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }

      dispatch(uiActions.showNotification({
        status: 'success', 
        title: 'Success!', 
        message: 'Cart data stored successfully.'
      }));
    };

    if (isInit) {
      isInit = false;
      return;
    }

    storeCartData().catch(() => {
      dispatch(uiActions.showNotification({
        status: 'error', 
        title: 'Error', 
        message: 'Sending cart data failed!'
      }));
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {isCartOpen && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
