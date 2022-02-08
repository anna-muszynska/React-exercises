import {useContext, useState} from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const submitOrderHandler = async (userdata) => {
      setIsSubmitting(true);

      await fetch("https://react-http-e6d4c-default-rtdb.europe-west1.firebasedatabase.app/orders.json", {
          method: 'POST',
          body: JSON.stringify({
              user: userdata,
              orderedItems: ctx.items
          })
      })

      setIsSubmitting(false);
      setDidSubmit(true);
      ctx.clearCart();
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
  );

  const cartModalContent = (
      <>
          {cartItems}
          <div className={styles.total}>
              <span>Total amount</span>
              <span>{totalAmount}</span>
          </div>
          {isCheckout && <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler}/>}
          {!isCheckout && modalActions}
      </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent =
      <>
          <p>Successfully order data...</p>
          <div className={styles.actions}>
              <button className={styles["button--alt"]} onClick={props.onClose}>
                  Close
              </button>
          </div>
      </>;

  return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
