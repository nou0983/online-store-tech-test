import { CartItem } from "../index.cart";
import { useCartContext } from "@/contexts/cart/cart-context";

const CartList = () => {
  const { items } = useCartContext();

  if (items.length === 0) {
    return <li>Your cart is empty</li>;
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
