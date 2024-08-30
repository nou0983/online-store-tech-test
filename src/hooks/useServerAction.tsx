import { useEffect } from "react";
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

type UseServerActionType = React.RefObject<HTMLFormElement>;

const useServerAction = (formElement: UseServerActionType) => {
  const { dispatch: modalDispatch } = useModalContext();
  const { dispatch: cartDispatch } = useCartContext();

  const [formState, action] = useFormState(submitOrderAction, {
    message: null,
    errors: {},
  });

  // Reset the form and show the confirmation modal when the form is successfully submitted
  useEffect(() => {
    if (formState.message === "success" && formElement.current) {
      formElement.current.reset();
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
      cartDispatch({ type: "cart/clear" });
    }
  }, [formState.message, cartDispatch, modalDispatch, formElement]);

  // Scroll to the top of the page if there are errors in case the form is long
  useEffect(() => {
    if (Object.keys(formState.errors).length > 0 && formElement.current) {
      formElement.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [formState.errors, formElement]);

  return { formState, action };
};

export default useServerAction;
