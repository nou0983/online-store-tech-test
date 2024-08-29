"use client";

import Image from "next/image";
import { useCartContext } from "@/contexts/cart/cart-context";
import { useModalContext } from "@/contexts/modal/modal-context";
import { Button, StarRating } from "@/components/ui/index.ui";
import { formatPrice } from "@/utils/helper";
import styles from "./product-item.module.scss";
import type { Product } from "@/types/products.types";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const { dispatch: cartDispatch } = useCartContext();
  const { dispatch: modalDispatch } = useModalContext();

  const {
    title,
    description,
    image,
    price,
    rating: { rate, count },
  } = product;

  const handleClick = () => {
    cartDispatch({ type: "cart/addItems", payload: product });
    modalDispatch({ type: "modal/open", payload: "cart" });
  };

  return (
    <li className={styles["product-item"]}>
      <h3>{title}</h3>
      <div className={styles["img-container"]}>
        <Image src={image} alt={title} fill priority className="center-image" />
      </div>
      <p>{description}</p>
      <div className={styles["info-container"]}>
        <span className={styles.price}>{formatPrice(price)}</span>
        <span className={styles["rating-container"]}>
          <StarRating rate={Math.floor(rate)} /> <span>({count})</span>
        </span>
      </div>
      <Button color="blue" onClick={handleClick}>
        Add to Cart
      </Button>
    </li>
  );
};

export default ProductItem;
