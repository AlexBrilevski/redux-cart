import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { storeCartData } from './store/cart-slice';
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
    if (isInit) {
      isInit = false;
      return;
    }

    dispatch(storeCartData(cart));
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
