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
			<PriceForm eventId={"" + defaultScheduleData?.id} />
			<EventScheduleForm
				defaultData={defaultScheduleData?.times as EventTimeT}
			/>
		</div>
	);
};

export default EventSettings;
