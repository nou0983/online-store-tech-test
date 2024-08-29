import type { ButtonHTMLAttributes } from "react";
import styles from "./button.module.scss";

type Color = "blue" | "green";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { color?: Color };

const Button = ({
  type = "button",
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
      className={`${styles.button} ${color ? styles[`button--${color}`] : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
