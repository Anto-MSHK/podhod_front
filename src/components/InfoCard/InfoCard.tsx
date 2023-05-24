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
		<img style={{ width: "30px", height: "30px" }} src={icon} alt="" />
	) : (
		"primary"
	);
	return (
		<div className={styles.card}>
			<Toast className={styles.toast_container}>
				<ToastHeader className={styles.toast_header} icon={iconNode}>
					<p style={{ fontSize: "14px", fontWeight: '700' }}>{title}</p>
				</ToastHeader>
					<ToastBody className={styles.toast_body}>
						<p style={{ fontSize: "14px", fontWeight: '600' }}>{value}</p>
					</ToastBody>
			</Toast>
		</div>
	);
};
