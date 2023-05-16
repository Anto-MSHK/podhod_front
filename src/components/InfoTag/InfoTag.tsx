import * as React from "react";
import styles from "./InfoTag.module.css";
import classNames from "classnames";

interface IInfoTagProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	color?: string;
	text?: string;
	icon?: string;
	className?: string,
}



export const InfoTag: React.FC<IInfoTagProps> = ({ color, text, icon, className, style}, props) => {

	let classes = classNames(
		className,
		styles.status_container,
	)
	return (
		<div {...props}  className={classes} style={{ backgroundColor: color, ...style}} >
				{icon && <img src={icon} alt={text} className={styles.status_img} />}
				{text}
		</div>
	);
};
