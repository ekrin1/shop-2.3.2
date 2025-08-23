import { Badge } from '@mantine/core';
import Button from '../../../shared/components/Button.tsx';
import Cart from './Cart.tsx';
import styles from './Header.module.scss';
import { MyContext } from '../../../context/MyContext.ts';
import { useContext } from 'react';

export default function Header() {
  const cartOpenHandler = () => {
    setCartOpen(!cartOpen);
  };

  const { cartOpen, setCartOpen, orders } = useContext(MyContext);
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.headerLogo}>
          <span className={styles.headerText}>
            Vegetable{' '}
            <a href="">
              <img src="./src/assets/img/logo.svg" alt="Logo" />
            </a>
          </span>
        </div>
        <div className={styles.cart}>
          <Button
            color="green"
            radius="md"
            size="lg"
            onClick={cartOpenHandler}
          >
            <Badge
              className={styles.badge}
              color="white"
              mr={10}
              circle
              size="md"
            >
              <span>{orders.length}</span>
            </Badge>
            <span>Cart</span>
            <img src="./src/assets/img/cart.svg" alt="Cart" />
          </Button>
        </div>
      </div>
      {cartOpen && <Cart />}
    </header>
  );
}
