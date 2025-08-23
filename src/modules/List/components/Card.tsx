import { Card as MantineCard, Image } from '@mantine/core';
import Button from '../../../shared/components/Button';
import styles from './Card.module.scss';
import { MyContext } from '../../../context/MyContext';
import { useContext, useState } from 'react';
import type { Product } from '../../../types/Product';

type CardProps = {
  product: Product;
  loading: boolean;
};

export default function Card({ product, loading }: CardProps) {
  const { setOrders } = useContext(MyContext);
  const [counter, setCounter] = useState(1);
  const increaseCountHandler = () => {
    setCounter((prev) => prev + 1);
  };

  const decreaseCountHandler = () => {
    if (counter === 1) return;
    setCounter((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    setOrders((prev) => {
      const existingProduct = prev.find(
        (item) => item.product.id === product.id
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + counter }
            : item
        );
      } else {
        return [...prev, { product, quantity: counter }];
      }
    });
    setCounter(1);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <div className={styles.cardLoader}>
          {' '}
          <img src="./src/assets/img/loader.svg" alt="Loader" />
        </div>
      ) : (
        <MantineCard p={0}>
          <Image src={product.image} alt={product.name} />

          <div className={styles.cardMain}>
            <h4>{product.name}</h4>
            <div className={styles.addBlock}>
              <button
                className={styles.iconMinus}
                onClick={decreaseCountHandler}
              ></button>
              <span>{counter}</span>
              <button
                className={styles.iconPlus}
                onClick={increaseCountHandler}
              ></button>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <h3>$ {product.price * counter}</h3>
            <div className={styles.cardButton}>
              <Button
                onClick={addToCartHandler}
                className={styles.cardButton}
                color="rgb(231, 250, 235)"
                size="lg"
              >
                <span>Add to cart</span>
                <img src="./src/assets/img/cart2.svg" alt="Cart" />
              </Button>
            </div>
          </div>
        </MantineCard>
      )}
    </div>
  );
}
