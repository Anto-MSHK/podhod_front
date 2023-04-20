import React from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import logoExample from "../../../assets/pictures/logoExample.png";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";

export const EventPage = () => {
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			height: '499px',
			justifyContent: 'space-between'
		}}>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				textAlign: 'center',
				width: '277px',
			}}>
				<Head leftElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>}
							centerElement={<img style={{width: '120px', height: '30px'}} src={logoExample} />}
							rightElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round text={'6+'} onClick={() => console.log("Clicked")} /></div>}
							isTransparent={true}
				/>
			</div>
			<div style={{
				flexGrow: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				textAlign: 'center'
			}}>
				<h1>1</h1>
			</div>
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				textAlign: 'center'
			}}>
				<BottomMenu>
					<div style={{width: '100%', height: '50px'}}><ButtonArt text={'Перейти к выставке'} arrow /></div>
				</BottomMenu>
			</div>
		</div>
	);
};