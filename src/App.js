import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartData, storeCartData } from './store/cart-actions';
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
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInit) {
      isInit = false;
      return;
    }

    if (cart.changed) {
      dispatch(storeCartData(cart));
    }
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
