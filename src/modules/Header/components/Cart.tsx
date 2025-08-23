import styles from './Cart.module.scss';
import { MyContext } from '../../../context/MyContext';
import { useContext } from 'react';

export default function Cart() {
  const { orders } = useContext(MyContext);

  const totalPrice = orders.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.product.id} className={styles.cartItem}>
            <img src={order.product.image} alt={order.product.name} />
            <div className={styles.cartItemDetails}>
              <h4>{order.product.name}</h4>
              <h3>$ {order.product.price}</h3>
            </div>
            <div className={styles.addBlock}>
              <button className={styles.iconMinus}></button>
              <span>{order.quantity}</span>
              <button className={styles.iconPlus}></button>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.cartEmpty}>
          <img src="./src/assets/img/cart_empty.svg" alt="Empty" />
          <p>Your cart is empty</p>
        </div>
      )}

      <div className={styles.total}>
        {orders.length !== 0 && (
          <>
            <span>Total</span>
            <span>$ {totalPrice}</span>{' '}
          </>
        )}
      </div>
    </div>
  );
}
