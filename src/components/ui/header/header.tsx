import { Logo, ButtonCart } from "@/components/ui/index.ui";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <ButtonCart />
    </header>
  );
};

export default Header;
