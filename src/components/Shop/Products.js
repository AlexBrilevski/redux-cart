import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS_DATA = [
  { id: 'p1', title: 'Test', price: 6, description: 'This is a first product - amazing!' }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS_DATA.map(product => <ProductItem
          key={product.id}
          {...product}
        />)}
      </ul>
    </section>
  );
};

export default Products;
