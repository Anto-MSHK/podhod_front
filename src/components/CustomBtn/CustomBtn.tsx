import React, { FC } from "react";
import { Button, ButtonProps } from "reactstrap";
import styles from "./CustomBtn.module.css";
var classNames = require('classnames');
interface ButtonArtI extends ButtonProps {

	icon?: any;
	iconWidth?: number;
	iconPosition?: 'top' | 'left' | 'right' | 'bottom'
}

export const CustomBtn: FC<ButtonArtI> = ({
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
				{...props}
				className={classes}
				
			>
				{iconElement}
				{props.children}
			</Button>
		</div>
	);
};
