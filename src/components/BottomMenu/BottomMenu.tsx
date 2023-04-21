import React from 'react';
import styles from './BottomMenu.module.css'
interface BottomMenuI {
	children: React.ReactNode;
	style?: React.CSSProperties;
}

export const BottomMenu: React.FC<BottomMenuI> = ({ children, style }) => {
	return (
		<div className={styles.bottomMenu} style={style}>
			<div className={styles.childContainer}>{children}</div>
		</div>
	);
};
