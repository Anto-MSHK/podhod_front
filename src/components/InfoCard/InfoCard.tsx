import React from 'react';
import styles from './InfoCard.module.css';

interface InfoCardProps {
	title: string;
	value: string | number;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, value }) => {
	return (
		<div className={styles.card}>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.value}>{value}</p>
		</div>
	);
};
