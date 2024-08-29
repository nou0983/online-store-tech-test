import styles from "./spinner.module.scss";

type SpinnerProps = {
  size?: "small";
};

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div
      className={`${styles.spinner} ${size ? styles[`spinner--${size}`] : ""}`}
    ></div>
  );
};

export default Spinner;
