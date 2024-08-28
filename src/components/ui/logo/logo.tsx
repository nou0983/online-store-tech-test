import Link from "next/link";
import { HiLightningBolt } from "react-icons/hi";
import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <HiLightningBolt />
    </Link>
  );
};

export default Logo;
