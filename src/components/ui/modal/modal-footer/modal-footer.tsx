import { type Dispatch } from "react";
import { Button, ButtonWithServerStatus } from "../../index.ui";
import { formatPrice } from "@/utils/helper";
import styles from "./modal-footer.module.scss";
import type { HeadingType } from "@/contexts/modal/modal-context";
import type { CartItemType } from "@/contexts/cart/cart-context";
import type { FormStateType } from "@/hooks/useServerAction";
import type { ModalActionType } from "@/contexts/modal/modal-context-reducer";

type ModalFooterProps = {
  items: CartItemType[];
  heading: HeadingType;
  totalPrice: number;
  formState: FormStateType;
  modalDispatch: Dispatch<ModalActionType>;
};

const ModalFooter = ({
  items,
  heading,
  totalPrice,
  formState,
  modalDispatch,
}: ModalFooterProps) => {
  let disabled = false;
  let buttonText: string;
  let handleBtnClick: () => void;

  if (items.length === 0 && heading !== "order confirmation") {
    disabled = true;
  }

  if (heading === "cart") {
    buttonText = "Checkout";
    handleBtnClick = () => {
      modalDispatch({ type: "modal/open", payload: "checkout" });
    };
  } else if (heading === "checkout") {
    buttonText = "Confirm Order";
    handleBtnClick = () => {
      modalDispatch({ type: "modal/open", payload: "order confirmation" });
    };
  } else {
    buttonText = "Close";
    handleBtnClick = () => {
      modalDispatch({ type: "modal/close" });
    };
  }

  return (
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
          onClick={handleBtnClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default ModalFooter;
