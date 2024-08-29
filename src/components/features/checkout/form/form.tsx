import { FormRow } from "../index.checkout";
import styles from "./form.module.scss";

type inputFieldListType = {
  labelText: string;
  name: string;
};

const personalInputList: inputFieldListType[] = [
  { labelText: "email", name: "email" },
  { labelText: "name", name: "fullName" },
  { labelText: "address", name: "address" },
];

const PaymentInputList: inputFieldListType[] = [
  { labelText: "card number", name: "cardNumber" },
  { labelText: "name", name: "CardHolderName" },
  { labelText: "expiry (MM/YY)", name: "expiryDate" },
  { labelText: "CVC", name: "cvc" },
];

const Form = () => {
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
            />
          );
        })}
      </div>
    </div>
  );
};

export default Form;
