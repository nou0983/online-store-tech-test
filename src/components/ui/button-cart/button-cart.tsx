import { useModalContext } from "@/contexts/modal/modal-context";
import { HiOutlineShoppingBag } from "react-icons/hi";
import styles from "./button-cart.module.scss";

const ButtonCart = () => {
  const { dispatch, isOpen } = useModalContext();

  const handleClick = () => {
    if (!isOpen) {
      dispatch({ type: "modal/open", payload: "cart" });
      return;
    }
    dispatch({ type: "modal/close" });
  };

  return (
    <button type="button" className={styles["btn-cart"]} onClick={handleClick}>
      <HiOutlineShoppingBag />
      <span>&times;4</span>
    </button>
  );
};

export default ButtonCart;
