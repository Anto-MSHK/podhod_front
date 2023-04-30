import React, { FC } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import logoExample from "../../../assets/pictures/logoExample.png";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from './EventPage.module.css'
import { EventT } from "../../../app/Types/EventsT";
import { TextBox } from "../../../components/TextBox/TextBox";
import { eventForm } from "../../../app/Slices/ExpoCreateSlice";

interface IEventPage {
	data: eventForm | undefined;
}

export const EventPage: FC<IEventPage> = ({data}) => {

	type EventType = 'exhibition' | 'fair' | 'promo-exhibition';

	const typesEvent: Record<EventType, string> = {
		exhibition: "Выставка",
		fair: "Ярмарка",
		"promo-exhibition": "Промо-выставка",
	};

	function isEventType(key: string): key is EventType {
		return key in typesEvent;
	}

	const eventData = {
		extra: <h5>{data?.eventType && isEventType(data.eventType) ? typesEvent[data.eventType] : null}</h5>,
		title: `"${data && data.eventName ? data.eventName : 'Создайте новое мероприятие'}"`,
		desc: data?.description,
	};





	return (
		<div className={styles.eventPreview_wrapper}>
			<div className={styles.eventPreview_head}>
				<Head leftElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>}
							centerElement={<img style={{width: '120px', height: '30px'}} src={logoExample} />}
							rightElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round text={data && data.age ? data.age : '?'} onClick={() => console.log("Clicked")} /></div>}
							isTransparent={true}
							style={{width: '100%'}}
				/>
			</div>
			<div className={styles.eventPreview_content}>
				<TextBox data={eventData} />
			</div>
			<div className={styles.eventPreview_bottom}>
				<BottomMenu style={{backgroundColor: 'transparent'}}>
					<div style={{width: '100%'}}><ButtonArt text={'Перейти к выставке'} arrow /></div>
				</BottomMenu>
			</div>
		</div>
	);
};