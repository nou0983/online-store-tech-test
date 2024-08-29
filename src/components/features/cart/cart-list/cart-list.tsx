import { useCartContext } from "@/contexts/cart/cart-context";
import { useModalContext } from "@/contexts/modal/modal-context";
import { Button } from "@/components/ui/index.ui";
import { CartItem } from "../index.cart";
import styles from "./cart-list.module.scss";

const CartList = () => {
  const { items } = useCartContext();
  const { dispatch } = useModalContext();

  if (items.length === 0) {
    return (
      <li className={styles["empty-item"]}>
        <span>Your cart is empty</span>
        <Button
          onClick={() => dispatch({ type: "modal/close" })}
          width="20rem"
          color="blue"
        >
          Shop now
        </Button>
      </li>
    );
  }

  return (
    <ul>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default CartList;
