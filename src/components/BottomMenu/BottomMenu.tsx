import React, {CSSProperties} from 'react';
import styles from './BottomMenu.module.css';

interface BottomMenuI {
	children: React.ReactNode;
	gallery?: React.ReactNode;
	style?: CSSProperties
}

export const BottomMenu: React.FC<BottomMenuI> = ({ gallery, children , style}) => {
	return (
		<div className={styles.bottomMenu}>
			{gallery ? (
					<div className={styles.gallery}>
						{gallery}
				</div>
			) : null}
			<div className={styles.content}>
				<div className={styles.childContainer} style={style}>
					{children}
				</div>
			</div>
		</div>
	);
};