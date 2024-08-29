import { CartStateType } from "./cart-context";
import type { Product } from "@/types/products.types";

type AddItemsType = {
  type: "cart/addItems";
  payload: Product;
};
type RemoveItemType = {
  type: "cart/removeItem";
  payload: number;
};
type UpdateTotalPriceAndQtyType = {
  type: "cart/updateTotalPriceAndQty";
  payload: { totalPrice: number; totalQty: number };
};
export type CartActionType =
  | AddItemsType
  | RemoveItemType
  | UpdateTotalPriceAndQtyType;

const cartReducer = (
  state: CartStateType,
  action: CartActionType
): CartStateType => {
  switch (action.type) {
    case "cart/addItems":
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );

      return {
        ...state,
        items: itemExists
          ? [
              ...state.items.map((item) =>
                item.id === action.payload.id
                  ? { ...item, qty: item.qty++ }
                  : item
              ),
            ]
          : [...state.items, { ...action.payload, qty: 1 }],
      };
    case "cart/removeItem":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "cart/updateTotalPriceAndQty":
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalQty: action.payload.totalQty,
      };
    default:
      throw new Error(`Unhandled action type in cartReducer`);
  }
};

export default cartReducer;
