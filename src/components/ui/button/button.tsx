import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type Color = "blue" | "green";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  width?: string;
};

const Button = ({
  type = "button",
  width = "100%",
  children,
  onClick,
  color,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ width }}
      className={`${styles.button} ${color ? styles[`button--${color}`] : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
