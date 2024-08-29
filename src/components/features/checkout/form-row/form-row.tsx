import styles from "./form-row.module.scss";

type FormRowProps = {
  label: string;
  name: string;
  error: string | undefined;
};

const FormRow = ({ label, name, error }: FormRowProps) => {
  return (
    <div className={styles["form-row"]}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} />
      {error && <span className={styles["error-message"]}>{error}</span>}
    </div>
  );
};

export default FormRow;
