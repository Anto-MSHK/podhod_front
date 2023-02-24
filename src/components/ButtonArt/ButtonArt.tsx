import React, { FC } from "react";
import { Button } from "reactstrap";
import styles from "./ButtonArt.module.css";

interface IButtonArt {
  className: string;
  children: JSX.Element | string;
}

export const ButtonArt: FC<IButtonArt> = ({ children, className }) => {
  return (
    <div className={`${styles.customBtnWrapper}`}>
      <Button color={"warning"} className={`${styles.customBtn} ${className}`}>
        {children}
      </Button>
    </div>
  );
};
