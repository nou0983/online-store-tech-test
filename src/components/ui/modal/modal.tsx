"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Button, ButtonWithServerStatus } from "../index.ui";
import { CartList } from "@/components/features/cart/index.cart";
import { Form } from "@/components/features/checkout/index.checkout";
import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { submitOrderFormAction } from "@/actions/submit-order-form-action";
import { formatPrice } from "@/utils/helper";
import { CircleX } from "lucide-react";
import styles from "./modal.module.scss";

export type MessageType = "success" | "fail" | null;

export type FormStateType = {
  message: MessageType;
  errorObj: {
    name: string | null;
    email: string | null;
    address: string | null;
    cardNumber: string | null;
    cardHolderName: string | null;
    expiry: string | null;
    cvc: string | null;
  };
};

const Modal = () => {
  const { heading, dispatch: modalDispatch } = useModalContext();
  const { items, totalPrice, dispatch: cartDispatch } = useCartContext();

  const [formState, action] = useFormState(submitOrderFormAction, {
    message: null,
    errorObj: {
      name: null,
      email: null,
      address: null,
      cardNumber: null,
      cardHolderName: null,
      expiry: null,
      cvc: null,
    },
  });

  const formElement = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "success" && formElement.current) {
      formElement.current.reset();
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
      cartDispatch({ type: "cart/clear" });
    }
  }, [formState.message]);

  const handleClose = () => {
    modalDispatch({ type: "modal/close" });
  };

  let buttonText: string;
  let innerContent: JSX.Element;
  let disabled = false;
  let handleClick: () => void;

  if (heading === "cart") {
    buttonText = "Checkout";
    innerContent = <CartList />;
    handleClick = () => {
      modalDispatch({ type: "modal/open", payload: "checkout" });
    };
  } else if (heading === "checkout") {
    buttonText = "Confirm Order";
    innerContent = (
      <>
        <Form />
        <CartList />
      </>
    );
    handleClick = () => {
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
    };
  } else {
    buttonText = "Close";
    innerContent = (
      <p style={{ fontSize: "2.5rem", fontWeight: "700", padding: "5rem 0" }}>
        Thank you for your order!
      </p>
    );
    handleClick = () => {
      modalDispatch({ type: "modal/close" });
    };
  }

  if (items.length === 0 && heading !== "order confirmation") {
    disabled = true;
  }

  return (
    <section
      className={`modal-overlay ${styles.modal}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;

        // Check if the className is an SVGAnimatedString and use baseVal
        const className =
          target instanceof SVGElement
            ? target.className.baseVal
            : target.className;

        if (className.includes("modal-overlay")) {
          handleClose();
        }
      }}
    >
      <form ref={formElement} action={action} className={styles.container}>
        <div className={styles.header}>
          <h2>{heading}</h2>
          <button type="button" onClick={handleClose}>
            <CircleX />
          </button>
        </div>
        <div className={styles["inner-container"]}>
          {formState.message === "fail" && <p>error</p>}
          {innerContent}
        </div>
        <div>
          {heading === "checkout" && (
            <>
              <h3 className={styles.total}>
                order summary: {formatPrice(totalPrice)}
              </h3>
              <ButtonWithServerStatus disabled={disabled}>
                {buttonText}
              </ButtonWithServerStatus>
            </>
          )}
          {heading !== "checkout" && (
            <Button
              color={buttonText !== "Close" ? "green" : undefined}
              disabled={disabled}
              onClick={handleClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Modal;
