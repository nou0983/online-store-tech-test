import Link from "next/link";
import { Zap } from "lucide-react";
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <Zap />
    </Link>
  );
};

export default Logo;
