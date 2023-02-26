import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./ButtonArt.module.css";

interface ButtonArtI extends ButtonProps {
    className?: string;
    children: JSX.Element | string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    icon?: any;
}

export const ButtonArt: FC<ButtonArtI> = ({
                                              children,
                                              className = "",
                                              onClick,
                                              type = "button",
                                              color,
                                              active,
                                              icon,
                                          }) => {
    const customClassName = className ? className : styles.customBtn;
    const iconElement = icon ? <img className={styles.imageWrapper} src={icon} alt={''}/> : null;

    return (
        <div className={`${styles.customBtnWrapper}`}>
            <Button
                color={color}
                className={customClassName}
                onClick={onClick}
                type={type}
                active={active}
            >
                {iconElement}
                {children}
            </Button>
        </div>
    );
};
