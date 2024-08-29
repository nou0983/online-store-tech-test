"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { Button, ButtonWithServerStatus } from "../index.ui";
import { CartList } from "@/components/features/cart/index.cart";
import { Form } from "@/components/features/checkout/index.checkout";
import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { submitOrderAction } from "@/actions/submit-order-action";
import { formatPrice } from "@/utils/helper";
import { CircleX } from "lucide-react";
import styles from "./modal.module.scss";

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

const Modal = () => {
  const { heading, dispatch: modalDispatch } = useModalContext();
  const { items, totalPrice, dispatch: cartDispatch } = useCartContext();

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
        <Form errors={formState.errors} />
        <CartList />
      </>
    );
    handleClick = () => {
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
    };
  } else {
    buttonText = "Close";
    innerContent = (
      <p
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
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
        <div className={styles["inner-container"]}>{innerContent}</div>
        <div>
          {heading === "checkout" && (
            <>
              <h3 className={styles.total}>
                order summary: {formatPrice(totalPrice)}
              </h3>
              {formState.errors.form && (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--color-red)",
                    marginBottom: "1rem",
                  }}
                >
                  {formState.errors.form}
                </p>
              )}
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
