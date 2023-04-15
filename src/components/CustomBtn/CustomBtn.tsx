import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./CustomBtn.module.css";
var classNames = require('classnames');
interface ButtonArtI extends ButtonProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	size?: "lg" | "sm";
	icon?: any;
	iconWidth?: number;
	disabled?: boolean;
	color?: string;
	iconPosition?: 'top' | 'left' | 'right' | 'bottom'
}

export const CustomBtn: FC<ButtonArtI> = ({
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
	color = "warning",
	iconPosition = 'left',

}) => {
	

	const classes = classNames(
		styles.customBtn,
		styles[`icon_${iconPosition}`],
		styles[className],
	  )
	const iconElement = icon ? (
		<img
			className={styles.imageWrapper}
			style={{ width: iconWidth }}
			src={icon}
			alt={""}
		/>
	) : null;
/* 
	`${styles.customBtn} ${styles[`icon_${iconPosition}`]} ${className}` */
	return (
		<div className={styles.custom_btn_container}>
			<Button
			
				onClick={onClick}
				type={type}
				active={active}
				style={style}
				disabled={disabled}
				size={size}
				color={color}
				className={classes}
			>
				{iconElement}
				{children}
			</Button>
		</div>
	);
};
