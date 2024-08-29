"use client";

import Image from "next/image";
import {
  useCartContext,
  type CartItemType,
} from "@/contexts/cart/cart-context";
import { QtyController } from "../index.cart";
import { formatPrice } from "@/utils/helper";
import { Trash2 } from "lucide-react";
import styles from "./cart-item.module.scss";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { dispatch } = useCartContext();
  const { id, image, title, price, qty } = item;

  const handleRemove = () => {
    dispatch({ type: "cart/removeItem", payload: id });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    qty?: number
  ) => {
    const value = qty || e.target.value;
    if (!isNaN(+value)) {
      dispatch({
        type: "cart/updateQty",
        payload: { id, qty: +value },
      });
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      dispatch({
        type: "cart/updateQty",
        payload: { id, qty: qty - 1 },
      });
      return;
    }
    dispatch({ type: "cart/removeItem", payload: id });
  };

  const handleIncrement = () => {
    dispatch({
      type: "cart/updateQty",
      payload: { id, qty: qty + 1 },
    });
  };

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
          <QtyController
            qty={qty}
            onChange={handleChange}
            onDecrement={handleDecrement}
            onIncrement={handleIncrement}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
