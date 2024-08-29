import { Trash2, Minus, Plus } from "lucide-react";
import styles from "./qty-controller.module.scss";

type QtyControllerProps = {
  qty: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, qty?: number) => void;
  onDecrement: () => void;
  onIncrement: () => void;
};

const QtyController = ({
  qty,
  onChange,
  onDecrement,
  onIncrement,
}: QtyControllerProps) => {
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "0") {
      onChange(e, 1);
    }
  };

  return (
    <div className={styles["qty-controller"]}>
      <button type="button" onClick={onDecrement}>
        {qty <= 1 ? <Trash2 /> : <Minus />}
      </button>
      <input type="text" value={qty} onChange={onChange} onBlur={handleBlur} />
      <button type="button" onClick={onIncrement}>
        <Plus />
      </button>
    </div>
  );
};

export default QtyController;
