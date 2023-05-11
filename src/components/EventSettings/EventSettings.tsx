import React from "react";
import { EventScheduleForm } from "../EventScheduleForm/EventScheduleForm";
import { EventT, EventTimeT } from "../../app/Types/EventsT";

type EventSettingsPropsT = {
	defaultScheduleData?: EventT;
};

export const EventSettings: React.FC<EventSettingsPropsT> = ({
	defaultScheduleData,
}) => {
	return (
		<div>
			<EventScheduleForm
				defaultData={defaultScheduleData?.times as EventTimeT}
			/>
		</div>
	);
};

export default EventSettings;
