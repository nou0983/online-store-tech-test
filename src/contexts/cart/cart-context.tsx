"use client";

import { createContext, useReducer, useContext, useEffect } from "react";
import cartReducer, { type CartActionType } from "./cart-context-reducer";
import type { Product } from "@/types/products.types";

// Types related to the cart context
type CartContextType = CartStateType & {
  dispatch: React.Dispatch<CartActionType>;
};
type CartProviderProps = { children: React.ReactNode };
export type CartItemType = Product & { qty: number };
export type CartStateType = {
  items: CartItemType[];
  totalPrice: number;
  totalQty: number;
};

const initialStateCart: CartStateType = {
  items: [],
  totalPrice: 0,
  totalQty: 0,
};

const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialStateCart);

  useEffect(() => {
    calculateTotalPriceAndQty();
  }, [state.items]);

  const calculateTotalPriceAndQty = () => {
    let totalPrice = 0;
    let totalQty = 0;

    state.items.forEach((item) => {
      totalPrice += item.price * item.qty;
      totalQty += item.qty;
    });

    dispatch({
      type: "cart/updateTotalPriceAndQty",
      payload: { totalPrice, totalQty },
    });
  };

  const value: CartContextType = {
    ...state,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
};

export { CartProvider, useCartContext };
