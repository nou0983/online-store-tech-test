import { FormRow } from "../index.checkout";
import styles from "./form.module.scss";
import type { ErrorsType } from "@/components/ui/modal/modal";

type inputFieldListType = {
  labelText: string;
  name: string;
};

type FormProps = {
  errors: ErrorsType;
};

const personalInputList: inputFieldListType[] = [
  { labelText: "email", name: "email" },
  { labelText: "name", name: "fullName" },
  { labelText: "address", name: "address" },
];

const PaymentInputList: inputFieldListType[] = [
  { labelText: "card number", name: "cardNumber" },
  { labelText: "name", name: "cardHolderName" },
  { labelText: "expiry (MM/YY)", name: "expiryDate" },
  { labelText: "CVC", name: "cvc" },
];

const Form = ({ errors }: FormProps) => {
  return (
    <div className={styles.form}>
      <div>
        <h3>shipping information</h3>
        {personalInputList.map((input) => {
          return (
            <FormRow
              key={input.name}
              label={input.labelText}
              name={input.name}
              error={errors?.[input.name as keyof ErrorsType]}
            />
          );
        })}
      </div>
      <div>
        <h3>payment</h3>
        {PaymentInputList.map((input) => {
          return (
            <FormRow
              key={input.name}
              label={input.labelText}
              name={input.name}
              error={errors?.[input.name as keyof ErrorsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Form;
