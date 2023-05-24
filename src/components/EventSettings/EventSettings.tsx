import React, { useState } from "react";
import { EventScheduleForm } from "../EventScheduleForm/EventScheduleForm";
import { EventT, EventTimeT } from "../../app/Types/EventsT";
import { PriceForm } from "../PriceForm/PriceForm";
import styles from "./EventSettings.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useDeleteEventMutation } from "../../app/services/EventsApi";
import { useNavigate, useParams } from "react-router-dom";
import { PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";

type EventSettingsPropsT = {
	defaultScheduleData?: EventT;
};

export const EventSettings: React.FC<EventSettingsPropsT> = ({
	defaultScheduleData,
}) => {
	const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
	const navigate = useNavigate();
	const { id: eventId } = useParams();
	const [toggle, setToggle] = useState(false);
	const handleDeleteEvent = async () => {
		if (eventId) {
			console.log("pupa");
			await deleteEvent({ eventId });
			navigate("/");
		}
	};

	return (
		<div className={styles.main_settings_container}>
			<div className={styles.content_container}>
				<div className={styles.price_container}>
					<PriceForm eventId={"" + defaultScheduleData?.id} />
				</div>
				<div className={styles.schedule_container}>
					<EventScheduleForm
						defaultData={defaultScheduleData?.times as EventTimeT}
					/>
				</div>
			</div>
			<div style={{ display: "flex" }}>
				<div style={{ margin: "0 0 0 auto" }}>
					<CustomBtn
						id="deleteEvent"
						className={styles.deleteEventButton}
						onClick={() => setToggle(prev => !prev)}
					>
						{toggle ? "Закрыть" : "Удалить мероприятие"}
					</CustomBtn>
				</div>
				<UncontrolledPopover
					placement="top"
					target="deleteEvent"
					trigger="click"
				>
					<PopoverHeader style={{ color: "black", backgroundColor: "white" }}>
						<h5>Мероприятие будет безвозвратно удалено</h5>
					</PopoverHeader>
					<PopoverBody>
						<div style={{ marginBottom: "10px" }}>
							<h5 style={{ fontSize: "16px" }}>Вы уверены?</h5>
						</div>
						<div style={{ display: "flex" }}>
							<button
								className={styles.deleteSubmitButton}
								onClick={() => handleDeleteEvent()}
							>
								Подтвердить
							</button>
						</div>
					</PopoverBody>
				</UncontrolledPopover>
			</div>
		</div>
	);
};
