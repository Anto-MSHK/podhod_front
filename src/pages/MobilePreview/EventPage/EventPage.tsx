import React from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import logoExample from "../../../assets/pictures/logoExample.png";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from './EventPage.module.css'

export const EventPage = () => {
	return (
		<div className={styles.eventPreview_wrapper}>
			<div className={styles.eventPreview_head}>
				<Head leftElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>}
							centerElement={<img style={{width: '120px', height: '30px'}} src={logoExample} />}
							rightElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round text={'6+'} onClick={() => console.log("Clicked")} /></div>}
							isTransparent={true}
							style={{width: '100%'}}
				/>
			</div>
			<div className={styles.eventPreview_content}>
				<h1>1</h1>
			</div>
			<div className={styles.eventPreview_bottom}>
				<BottomMenu style={{backgroundColor: 'transparent'}}>
					<div style={{width: '100%', height: '50px'}}><ButtonArt text={'Перейти к выставке'} arrow /></div>
				</BottomMenu>
			</div>
		</div>
	);
};