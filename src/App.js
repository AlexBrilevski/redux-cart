import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const cart = useSelector(state => state.cart);
  const isCartOpen = useSelector(state => state.ui.isCartOpen);

  useEffect(() => {
    fetch('https://react-products-database-e5f44-default-rtdb.europe-west1.firebasedatabase.app/cart.json', 
      {method: 'PUT', body: JSON.stringify(cart)}
    );
  }, [cart]);

  return (
    <Layout>
      {isCartOpen && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
