import { Logo, BtnCart } from "@/components/ui";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <BtnCart />
    </header>
  );
};

export default Header;
