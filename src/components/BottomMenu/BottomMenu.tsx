import React from 'react';
import styles from './BottomMenu.module.css'
interface BottomMenuI {
	children: React.ReactNode;
}

export const BottomMenu: React.FC<BottomMenuI> = ({ children }) => {
	return (
		<div className={styles.bottomMenu}>
			<div className={styles.childContainer}>{children}</div>
		</div>
	);
};
