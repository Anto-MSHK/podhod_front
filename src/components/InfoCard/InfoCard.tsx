import React from "react";
import styles from "./InfoCard.module.css";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

interface InfoCardProps {
	title: string;
	value: string | number;
	icon?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon }) => {
	let iconNode = icon ? (
		<img style={{ width: "30px", height: "30px", justifyContent: 'center' }} src={icon} alt="" />
	) : (
		"primary"
	);
	return (
		<div className={styles.card}>
			<Toast className={styles.toast_container}>
				<ToastHeader className={styles.toast_header} icon={iconNode}>
					{title}
				</ToastHeader>
					<ToastBody className={styles.toast_body}>
						{value}
					</ToastBody>
			</Toast>
		</div>
	);
};
