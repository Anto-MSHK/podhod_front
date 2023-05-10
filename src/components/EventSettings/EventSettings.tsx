import React from "react";
import { EventScheduleFrom } from "../EventScheduleForm/EventScheduleFrom";
import { EventT, EventTimeT } from "../../app/Types/EventsT";

type EventSettingsPropsT = {
    defaultScheduleData?: EventT
};

export const EventSettings: React.FC<EventSettingsPropsT> = ({defaultScheduleData}) => {
    
	return (
    <div>
        <EventScheduleFrom defaultData={defaultScheduleData?.times as EventTimeT}/>
    </div>
    )
};
