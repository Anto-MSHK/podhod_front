import React from "react";
import { BottomMenu } from "../BottomMenu/BottomMenu";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import Head from "../Head/Head";
import backArrow from '../../assets/icons/backArrow.svg'
import logoExample from '../../assets/pictures/logoExample.png'


export const PreviewLayout = ({children} : any) => {
	return (
		<div>
			{children}
		</div>
	);
};