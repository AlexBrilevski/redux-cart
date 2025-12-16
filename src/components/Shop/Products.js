import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS_DATA = [
  { id: 'p1', title: 'First product', price: 6, description: 'This is a first product - amazing!' },
  { id: 'p2', title: 'Second product', price: 8, description: 'This is a second product - cool!' },
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
