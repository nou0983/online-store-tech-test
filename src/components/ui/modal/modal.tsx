"use client";

import { Button } from "../index.ui";
import { CartList } from "@/components/features/cart/index.cart";
import { Form } from "@/components/features/checkout/index.checkout";
import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { formatPrice } from "@/utils/helper";
import { CircleX } from "lucide-react";
import styles from "./modal.module.scss";

const Modal = () => {
  const { heading, dispatch } = useModalContext();
  const { items, totalPrice } = useCartContext();

  const handleClose = () => {
    dispatch({ type: "modal/close" });
  };

  let buttonText: string;
  let innerContent: JSX.Element;
  let disabled = false;
  let handleClick: () => void;

  if (heading === "cart") {
    buttonText = "Checkout";
    innerContent = <CartList />;
    handleClick = () => {
      dispatch({ type: "modal/open", payload: "checkout" });
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
      dispatch({ type: "modal/open", payload: "order confirmation" });
    };
  } else {
    buttonText = "Close";
    innerContent = (
      <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>
        Thank you for your order!
      </p>
    );
    handleClick = () => {
      dispatch({ type: "modal/close" });
    };
  }

  if (items.length === 0) {
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
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{heading}</h2>
          <button type="button" onClick={handleClose}>
            <CircleX />
          </button>
        </div>
        <div className={styles["inner-container"]}>{innerContent}</div>
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
    </section>
  );
};

export default Modal;
