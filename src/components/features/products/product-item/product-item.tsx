import Image from "next/image";
import { Button } from "@/components/ui/index.ui";
import { formatPrice } from "@/utils/helper";
import styles from "./product-item.module.scss";
import type { Product } from "@/types/products.types";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const {
    title,
    description,
    image,
    price,
    rating: { rate, count },
  } = product;

  return (
    <li className={styles["product-item"]}>
      <h3>{title}</h3>
      <div className={styles["img-container"]}>
        <Image src={image} alt={title} fill />
      </div>
      <p>{description}</p>
      <div className={styles["info-container"]}>
        <span className={styles.price}>{formatPrice(price)}</span>
        <span>
          {rate} {count}
        </span>
      </div>
      <Button color="blue">Add to Cart</Button>
    </li>
  );
};

export default ProductItem;
