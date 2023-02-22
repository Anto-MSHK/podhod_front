import { FC } from "react";
import { Header } from "./Header/Header";
import styles from "./Layout.module.css";
interface LayoutI {
  children: JSX.Element;
}

export const Layout: FC<LayoutI> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
    </div>
  );
};
