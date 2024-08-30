import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { submitOrderAction } from "@/actions/submit-order-action";

export type MessageType = "success" | "fail" | null;

export type ErrorsType = {
  fullName?: string;
  email?: string;
  address?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  cvc?: string;
  form?: string;
};

export type FormStateType = {
  message: MessageType;
  errors: ErrorsType;
};

const useServerAction = () => {
  const { dispatch: modalDispatch } = useModalContext();
  const { dispatch: cartDispatch } = useCartContext();

  const [formState, action] = useFormState(submitOrderAction, {
    message: null,
    errors: {},
  });

  const formElement = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "success" && formElement.current) {
      formElement.current.reset();
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
      cartDispatch({ type: "cart/clear" });
    }
  }, [formState.message, cartDispatch, modalDispatch]);

  return { formState, action, formElement };
};

export default useServerAction;
