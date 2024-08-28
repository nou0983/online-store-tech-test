"use client";

import { Button } from "../index.ui";
import { useModalContext } from "@/contexts/modal/modal-context";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./modal.module.scss";

const Modal = () => {
  const { heading, dispatch } = useModalContext();

  let buttonText: string;
  let innerContent: JSX.Element;

  if (heading === "cart") {
    buttonText = "Checkout";
    innerContent = (
      <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>
        Thank you for your order!
      </p>
    );
  } else if (heading === "checkout") {
    buttonText = "Confirm Order";
    innerContent = (
      <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>
        Thank you for your order!
      </p>
    );
  } else {
    buttonText = "Close";
    innerContent = (
      <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>
        Thank you for your order!
      </p>
    );
  }

  return (
    <section className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{heading}</h2>
          <button
            type="button"
            onClick={() => dispatch({ type: "modal/close" })}
          >
            <IoCloseCircleOutline />
          </button>
        </div>
        <div className={styles["inner-container"]}>{innerContent}</div>
        <Button color={buttonText !== "close" ? "green" : undefined}>
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default Modal;
