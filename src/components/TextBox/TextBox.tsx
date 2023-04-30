import React, { FC, ReactNode } from "react";
import './TextBox.module.css'

interface ITextBox {
	data: {
		extra?: any,
		title: string | undefined,
		shortDesc?: string | undefined,
		desc: string | undefined
	},
	children?: ReactNode;
}

export const TextBox: FC<ITextBox> = ({data}) => {
	return (
		<div className={'textBox_wrapper'}>
				<div className={'textBox_extra'}>
					{data.extra}
				</div>
			 <div className={'textBox_title'}>
				<h1>
					{data.title}
				</h1>
			 </div>
			<div className={'textBox_shortDesc'}>
				<h4 style={{color: 'var(--gray_color)'}}>{data.shortDesc}</h4>
			</div>
			<div className={'textBox_desc'}>
				<h5>{data.desc}</h5>
			</div>
		</div>
	);
};