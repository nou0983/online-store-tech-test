"use client";

import Image from "next/image";
import { useCartContext, type CartItem } from "@/contexts/cart/cart-context";
import { formatPrice } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import styles from "./cart-item.module.scss";

type CartItemProps = {
  item: CartItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const { dispatch } = useCartContext();
  const { id, image, title, price, qty } = item;

  const handleRemove = () => {
    dispatch({ type: "cart/removeItem", payload: id });
  };

  const handleChange = () => {};

  return (
    <li className={styles["cart-item"]}>
      <div className={styles["image-container"]}>
        <Image src={image} alt={title} fill className="center-image" />
      </div>
      <div>
        <div className={styles["header"]}>
          <h3>{title}</h3>
          <button type="button" onClick={handleRemove}>
            <Trash2 />
          </button>
        </div>
        <div className={styles["footer"]}>
          <span>{formatPrice(price)}</span>
          <p>
            <button>-</button>
            <input type="text" value={qty} onChange={handleChange} />
            <button>+</button>
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
