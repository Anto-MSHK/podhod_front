import React from "react";
import styles from "./Head.module.css";

var classNames = require("classnames");

interface HeadProps {
	leftElement?: React.ReactNode;
	centerElement?: React.ReactNode;
	rightElement?: React.ReactNode;
	isTransparent?: boolean;
	style?: React.CSSProperties;
	centerStyle?: React.CSSProperties;
	rightStyle?: React.CSSProperties;
	className?: string;
}

const Head: React.FC<HeadProps> = ({
																		 className,
																		 leftElement,
																		 centerElement,
																		 rightElement,
																		 isTransparent = false,
																		 centerStyle,
																		 rightStyle,
																		 style,
																	 }) => {
	if (!centerElement) {
		console.error("Center element is not defined in Head component");
	}

	let classes = classNames(className, styles.container, {
		[styles.transparent]: isTransparent,
	});

	return (
		<header className={classes} style={style}>
			<div className={styles.left}>
				{leftElement}
			</div>
			<div className={styles.center} style={centerStyle}>
				{centerElement}
			</div>
			<div className={styles.right} style={rightStyle}>
				{rightElement}
			</div>
		</header>
	);
};

export default Head;
