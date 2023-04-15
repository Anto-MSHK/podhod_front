import React from 'react';
import { CustomBtn } from '../CustomBtn/CustomBtn';
import styles from './Head.module.css';

interface ElementProps {
	type: 'back' | 'menu' | 'custom';
	content?: React.ReactNode;
	onClick?: () => void;
	customStyle?: React.CSSProperties;
}

interface HeadProps {
	leftElement?: ElementProps;
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
	backgroundColor = 'var(--header-bg-color, #f0f0f0)',
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

	const renderElement = (elementProps: ElementProps) => {
		const { type, content, onClick, customStyle } = elementProps;

		const handleClick = () => {
			if (onClick) onClick();
		};

		switch (type) {
			case 'back':
				return (
					<CustomBtn style={customStyle} onClick={handleClick}>
						Назад
					</CustomBtn>
				);
			case 'menu':
				return (
					<CustomBtn style={customStyle} onClick={handleClick}>
						Меню
					</CustomBtn>
				);
			case 'custom':
				return (
					<div style={customStyle} onClick={handleClick}>
						{content}
					</div>
				);
			default:
				return null;
		}
	};

	const left = leftElement ? renderElement(leftElement) : null;

	return (
		<header className={styles.container} style={headerStyle}>
			<div className={styles.left}>{left}</div>
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
