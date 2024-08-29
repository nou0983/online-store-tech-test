import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { ShoppingBag } from "lucide-react";
import styles from "./button-cart.module.scss";

const ButtonCart = () => {
  const { dispatch, isOpen } = useModalContext();
  const { totalQty } = useCartContext();

  const handleClick = () => {
    if (!isOpen) {
      dispatch({ type: "modal/open", payload: "cart" });
      return;
    }
    dispatch({ type: "modal/close" });
  };

  return (
    <button type="button" className={styles["btn-cart"]} onClick={handleClick}>
      <ShoppingBag />
      <span>&times;{totalQty}</span>
    </button>
  );
};

export default ButtonCart;
