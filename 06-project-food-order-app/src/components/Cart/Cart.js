import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${Math.round(ctx.totalAmount * 100) / 100}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
      <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onClose}>
              Close
          </button>
          {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
      </div>
  )

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
        {isCheckout && <Checkout onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
