import React, { FC, ReactNode } from "react";
import styles from './TextBox.module.css'

interface ITextBox {
	data: {
		extra?: any,
		title?: string | undefined,
		shortDesc?: string | undefined,
		desc: string | undefined
	},
	children?: ReactNode;
}

export const TextBox: FC<ITextBox> = ({data}) => {
	return (
		<div className={styles.textBox_wrapper}>
				<div className={styles.textBox_extra}>
					{data.extra}
				</div>
			 <div className={styles.textBox_title}>
				<h1 style={{fontSize: 36}}>
					{data.title}
				</h1>
			 </div>
			<div className={styles.textBox_shortDesc}>
				<h4 style={{color: 'var(--gray_color)'}}>{data.shortDesc}</h4>
			</div>
			<div className={styles.textBox_desc}>
				<h5>{data.desc}</h5>
			</div>
		</div>
	);
};