import styles from "./form-row.module.scss";

type FormRowProps = {
  label: string;
  name: string;
};

const FormRow = ({ label, name }: FormRowProps) => {
  return (
    <div className={styles["form-row"]}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} />
    </div>
  );
};

export default FormRow;
