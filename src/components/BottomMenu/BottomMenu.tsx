import React from 'react';

const styles = {
	bottomMenu: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	childContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		gap: '10px',
		padding: '5px'
	},
};

interface BottomMenuI {
	children: React.ReactNode;
}

export const BottomMenu: React.FC<BottomMenuI> = ({ children }) => {
	return (
		<div style={styles.bottomMenu}>
			<div style={styles.childContainer}>{children}</div>
		</div>
	);
};
