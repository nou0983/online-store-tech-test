"use client";

import { useModalContext } from "@/contexts/modal/modal-context";
import { Logo, ButtonCart, Modal } from "@/components/ui/index.ui";
import styles from "./header.module.scss";

const Header = () => {
  const { isOpen } = useModalContext();

  return (
    <>
      <header className={styles.header}>
        <Logo />
        <ButtonCart />
      </header>
      {isOpen && <Modal />}
    </>
  );
};

export default Header;
