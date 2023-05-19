import React from "react";
import { EventScheduleForm } from "../EventScheduleForm/EventScheduleForm";
import { EventT, EventTimeT } from "../../app/Types/EventsT";
import { PriceForm } from "../PriceForm/PriceForm";
import styles from "./EventSettings.module.css";

type EventSettingsPropsT = {
	defaultScheduleData?: EventT;
};

export const EventSettings: React.FC<EventSettingsPropsT> = ({
																															 defaultScheduleData,
																														 }) => {
	return (
		<div className={styles.content_container}>
			<div className={styles.price_container}>
				<PriceForm eventId={"" + defaultScheduleData?.id} />
			</div>
			<div className={styles.line}></div>
			<div className={styles.schedule_container}>
				<EventScheduleForm defaultData={defaultScheduleData?.times as EventTimeT} />
			</div>
		</div>
	);
};
