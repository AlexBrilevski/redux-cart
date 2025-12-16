import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const cartItemsCount = useSelector(state => state.cart.itemsCount);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    dispatch(uiActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleCartClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsCount}</span>
    </button>
  );
};

export default CartButton;
