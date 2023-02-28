import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./ButtonArt.module.css";

interface ButtonArtI extends ButtonProps {
  className?: string;
  style?: React.CSSProperties
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  icon?: any;
  iconWidth?: number
}

export const ButtonArt: FC<ButtonArtI> = ({
  children,
  className = "",
  onClick,
  type = "button",
  color,
  style,
  active,
  icon,
  iconWidth,
}) => {
  const customClassName = className ? className : styles.customBtn;
  const iconElement = icon ? (
    <img className={styles.imageWrapper} style = {{width: iconWidth}} src={icon} alt={""} />
  ) : null;

  return (
    <div className={`${styles.customBtnWrapper}`} >
      <Button
        color = {color}
        className={customClassName}
        onClick={onClick}
        type={type}
        active={active}
        style = {style}
      >
        {iconElement}
        {children}
      </Button>
    </div>
  );
};
