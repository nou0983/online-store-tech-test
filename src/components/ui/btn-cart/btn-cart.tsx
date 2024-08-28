import { HiOutlineShoppingBag } from "react-icons/hi";
import styles from "./btn-cart.module.scss";

const BtnCart = () => {
  return (
    <button type="button" className={styles["btn-cart"]}>
      <HiOutlineShoppingBag />
      <span>&times;4</span>
    </button>
  );
};

export default BtnCart;
