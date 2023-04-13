import React from 'react';
import styles from './Head.module.css';
import { CustomBtn } from "../CustomBtn/CustomBtn";

interface HeadProps {
	leftElementType?: 'back' | 'menu';
	centerElement: React.ReactNode;
	rightElement?: React.ReactNode;
	isTransparent?: boolean;
	backgroundColor?: string;
}

const Head: React.FC<HeadProps> = ({
																		 leftElementType,
																		 centerElement,
																		 rightElement,
																		 isTransparent = false,
																		 backgroundColor = '#f0f0f0'
																	 }) => {
	const headerStyle = {
		backgroundColor: isTransparent ? 'transparent' : backgroundColor
	};

	const renderLeftElement = () => {
		switch (leftElementType) {
			case 'back':
				return <CustomBtn>Назад</CustomBtn>;
			case 'menu':
				return <CustomBtn>Меню</CustomBtn>;
			default:
				return null;
		}
	};

	return (
		<header className={styles.container} style={headerStyle}>
			<div className={styles.left}>{renderLeftElement()}</div>
			<div className={styles.center}>{centerElement}</div>
			<div className={styles.right}>{rightElement}</div>
		</header>
	);
};

export default Head;
