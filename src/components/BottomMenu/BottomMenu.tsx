import React from 'react';

const styles = {
	bottomMenu: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		backgroundColor: '#161616',
		borderRadius: '15px 15px 0 0'
	},
	childContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		gap: '10px',
		padding: '10px'
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
