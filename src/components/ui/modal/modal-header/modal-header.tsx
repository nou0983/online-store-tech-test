import { CircleX } from "lucide-react";
import styles from "./modal-header.module.scss";
import type { HeadingType } from "@/contexts/modal/modal-context";

type ModalHeaderProps = {
  heading: HeadingType;
  onClick: () => void;
};

const ModalHeader = ({ heading, onClick }: ModalHeaderProps) => {
  return (
    <div className={styles["modal-header"]}>
      <h2>{heading}</h2>
      <button type="button" onClick={onClick}>
        <CircleX />
      </button>
    </div>
  );
};

export default ModalHeader;
