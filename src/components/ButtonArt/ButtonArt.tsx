import React, {FC} from "react";
import {Button, ButtonProps} from "reactstrap";
import styles from "./ButtonArt.module.css";

interface IButtonArt extends ButtonProps {
    className?: string;
    children: JSX.Element | string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

export const ButtonArt: FC<IButtonArt> = ({
                                              children,
                                              className = "",
                                              onClick,
                                              type = "button",
                                              color,
                                              active,
                                          }) => {
    const customClassName = className ? className : styles.customBtn;

    return (
        <div className={`${styles.customBtnWrapper}`}>
            <Button
                color={color}
                className={customClassName}
                onClick={onClick}
                type={type}
                active={active}
            >
                {children}
            </Button>
        </div>
    );
};