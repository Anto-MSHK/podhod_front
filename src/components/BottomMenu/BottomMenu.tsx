import React from 'react';
import styles from './BottomMenu.module.css';

interface BottomMenuI {
	children?: React.ReactNode;
	style?: React.CSSProperties;
	gallery?: React.ReactNode;
}


export const BottomMenu: React.FC<BottomMenuI> = ({ children, style, gallery }) => {
	return (
		<div className={styles.bottomMenu}>
			{gallery ? (
				<div className={styles.gallery}>{gallery}</div>
			) : null}
			<div className={styles.content}>
				<div className={styles.childContainer}>{children}</div>
			</div>
		</div>
	);
};
