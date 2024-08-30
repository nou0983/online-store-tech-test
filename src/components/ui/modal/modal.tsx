"use client";

import useServerAction from "@/hooks/useServerAction";
import { useModalContext } from "@/contexts/modal/modal-context";
import { useCartContext } from "@/contexts/cart/cart-context";
import { ModalHeader, ModalFooter } from "../index.ui";
import { CartList } from "@/components/features/cart/index.cart";
import { Form } from "@/components/features/checkout/index.checkout";
import styles from "./modal.module.scss";

const Modal = () => {
  const { heading, dispatch: modalDispatch } = useModalContext();
  const { items, totalPrice } = useCartContext();
  const { formState, formElement, action } = useServerAction();

  const handleClose = () => {
    modalDispatch({ type: "modal/close" });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Check if the className is an SVGAnimatedString and use baseVal
    const className =
      target instanceof SVGElement
        ? target.className.baseVal
        : target.className;

    if (className.includes("modal-overlay")) {
      handleClose();
    }
  };

  let innerContent: JSX.Element;

  if (heading === "cart") {
    innerContent = <CartList />;
  } else if (heading === "checkout") {
    innerContent = (
      <>
        <Form errors={formState.errors} />
        <CartList />
      </>
    );
  } else {
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
  }

  return (
    <section
      className={`modal-overlay ${styles.modal}`}
      onClick={handleOverlayClick}
    >
      <form ref={formElement} action={action} className={styles.container}>
        <ModalHeader heading={heading} onClick={handleClose} />
        <div className={styles["inner-container"]}>{innerContent}</div>
        <ModalFooter
          items={items}
          heading={heading}
          totalPrice={totalPrice}
          formState={formState}
          modalDispatch={modalDispatch}
        />
      </form>
    </section>
  );
};

export default Modal;
