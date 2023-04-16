import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./CustomBtn.module.css";
var classNames = require('classnames');
interface ButtonArtI extends ButtonProps {
	/* className?: string;
	style?: React.CSSProperties;
	onClick?: () => void; */
	/* type?: "button" | "submit" | "reset";
	size?: "lg" | "sm"; */
	icon?: any;
	iconWidth?: number;
	/* disabled?: boolean;
	color?: string; */
	iconPosition?: 'top' | 'left' | 'right' | 'bottom'
}

export const CustomBtn: FC<ButtonArtI> = ({
	/* children,
	className = '',
	onClick,
	type = "button",
	style,
	active,
	icon,
	iconWidth,
	disabled,
	size,
	color = "",
	iconPosition = 'left', */
	 iconPosition, icon, iconWidth, ...props

}) => {
	
	
	const classes = classNames(
		props.className,
		styles.customBtn,
		styles[`icon_${iconPosition}`],
	  )
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
				/* onClick={props.onClick}
				type={props.type}
				active={props.active}
				style={props.style}
				disabled={props.disabled}
				size={props.size} */
				{...props}
				className={classes}
				
			>
				{iconElement}
				{props.children}
			</Button>
		</div>
	);
};
