import React, { FC } from "react";
import { Button } from "reactstrap";
import styles from "./ButtonArt.module.css";

interface IButtonArt {
    className: string;
    children: JSX.Element | string;
    onCLick?: () => void;
}

export const ButtonArt: FC<IButtonArt> = ({ children, className, onCLick }) => {
    return (
        <div className={`${styles.customBtnWrapper}`}>
            <Button color={"warning"} className={`${styles.customBtn} ${className}`} onClick={onCLick}>
                {children}
            </Button>
        </div>
    );
};
