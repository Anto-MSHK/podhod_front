import React, { FC } from "react";
import './TextBox.module.css'

interface ITextBox {
	data: {
		extra?: React.ReactNode | JSX.Element | string,
		title: string,
		shortDesc?: string,
		desc: string
	}
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