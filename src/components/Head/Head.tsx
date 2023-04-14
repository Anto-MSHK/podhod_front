import React from 'react';
import styles from './Head.module.css';

interface HeadProps {
	leftElement?: React.ReactNode;
	centerElement?: React.ReactNode;
	rightElement?: React.ReactNode;
	isTransparent?: boolean;
	backgroundColor?: string;
	centerStyle?: React.CSSProperties;
	rightStyle?: React.CSSProperties;
}

const Head: React.FC<HeadProps> = ({
																		 leftElement,
																		 centerElement,
																		 rightElement,
																		 isTransparent = false,
																		 backgroundColor = 'var(--gray_color)',
																		 centerStyle,
																		 rightStyle,
																	 }) => {
	if (!centerElement) {
		console.error('Center element is not defined in Head component');
		return null;
	}

	const headerStyle = {
		backgroundColor: isTransparent ? 'transparent' : backgroundColor,
	};

	return (
		<header className={styles.container} style={headerStyle}>
			<div className={styles.left}>{leftElement}</div>
			<div className={styles.center} style={centerStyle}>
				{centerElement}
			</div>
			<div className={styles.right} style={rightStyle}>
				{rightElement}
			</div>
		</header>
	);
};

export default Head;
