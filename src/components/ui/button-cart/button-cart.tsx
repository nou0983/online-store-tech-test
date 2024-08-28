import { HiOutlineShoppingBag } from "react-icons/hi";
import styles from "./button-cart.module.scss";

const ButtonCart = () => {
  return (
    <button type="button" className={styles["btn-cart"]}>
      <HiOutlineShoppingBag />
      <span>&times;4</span>
    </button>
  );
};

export default ButtonCart;
