import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./ButtonArt.module.css";

interface ButtonArtI extends ButtonProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "lg" | "sm";
  icon?: any;
  iconWidth?: number;
  disabled?: boolean;
}

export const ButtonArt: FC<ButtonArtI> = ({
  children,
  className = "",
  onClick,
  type = "button",
  style,
  active,
  icon,
  iconWidth,
  disabled,
  size,
}) => {
  const customClassName = className ? className : styles.customBtn;
  const iconElement = icon ? (
    <img
      className={styles.imageWrapper}
      style={{ width: iconWidth }}
      src={icon}
      alt={""}
    />
  ) : null;

  return (
    <div className={styles.custom_btn_container}>
      <Button
        className={customClassName}
        onClick={onClick}
        type={type}
        active={active}
        style={style}
        disabled={disabled}
        size={size}
      >
        {iconElement}
        {children}
      </Button>
    </div>
  );
};
