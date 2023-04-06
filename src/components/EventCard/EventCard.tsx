import * as React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import styles from "./EventCard.module.css";
import { WidgetItem } from "../WidgetItem/WidgetItem";
import addFileIcon from "../../assets/icons/addFileIcon.svg";
import exhibits from "../../assets/icons/NumberOfExhibits.svg";
import icon2 from "../../assets/icons/Wallet.svg";
import icon3 from "../../assets/icons/SmilingFace.svg";
import { InfoTag } from "../InfoTag/InfoTag";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { EventT } from "../../app/Types/EventsT";
import { useGetEventPagesQuery } from "../../app/services/EventsApi";
import { API_URL } from "../../app/http";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { number as items } from "yup";
import { InfoMessage } from "../InfoMessage/InfoMessage";

interface IStyledCardProps {
	event: EventT;
	/*    eventTitle: string;
       image?: string;
       dateOfCreation: string;
       type: string;
       status: string;
       numberOfExhibits: string,
       entryCost: string,
       ageRestriction: string, */
}
enum EventStatus {
	draft = "draft",
	active = "active",
	completed = "completed",
}

export const pluralForm = (items: number) => {
	if (items == undefined) {
		return `экспонатов`;
	}
	if (items % 10 == 1 && items % 100 != 11) {
		return `экспонат`;
	} else if (
		2 <= items % 10 &&
		items % 10 <= 4 &&
		(items % 100 < 10 || items % 100 >= 20)
	) {
		return `экспоната`;
	} else {
		return `экспонатов`;
	}
};

const btnTitle = (status: string) => {
	switch (status) {
		case EventStatus.draft:
			return "Продолжить заполнение";

		case EventStatus.completed:
			return "Опубликовать";

		case EventStatus.active:
			return "Статистика";
		default:
			return "Нажми на меня";
	}
};

export const EventCard: React.FunctionComponent<IStyledCardProps> = ({
	event,
}) => {
	const { data: eventPages, isLoading } = useGetEventPagesQuery(event.id);
	const navigate = useNavigate();
	return (
		<Card className={styles.styledCard_container} color="dark" inverse>
			<div className={styles.card__img_container}>
				{!event.img ? (
					<InfoMessage
						desc="Добавьте картинку на странице редактирования"
						icon={addFileIcon}
						iconPosition="top"
						iconWidth={55}
					/>
				) : (
					<img
						className={
							styles.card__img + ` ${event.img.path ? styles.existImg : ""}`
						}
						src={`${API_URL}/${event.img.path}`}
						alt={event.img.description}
					/>
				)}
			</div>
			<div className={styles.card_status}>
				<InfoTag text={event.name} />
			</div>
			<CardBody className={styles.cardBody} inverse="true">
				<CardTitle tag="h3" className={styles.cardTitle}>
					{event.name}
				</CardTitle>
				<CardSubtitle tag="p" className="mb-2 min"></CardSubtitle>

				<CardBody className={styles.cardWidget}>
					{/* <WidgetItem
            info={(event as any).showpieces.length}
            icon={addFileIcon}
            description={pluralForm((event as any).showpieces.length)}
          /> */}

					<InfoMessage
						className={styles.widget}
						icon={exhibits}
						iconPosition="top"
						iconDesc={String((event as any).showpieces.length)}
						desc={pluralForm((event as any).showpieces.length)}
					/>
					{event.ageLimit && (
						/*  <WidgetItem
               info={event.ageLimit || ""}
               icon={icon3}
               description="возраст"
             /> */
						<InfoMessage
							className={styles.widget}
							icon={icon3}
							iconPosition="top"
							iconDesc={event.ageLimit || ""}
							desc="возраст"
						/>
					)}
					{event.prices.map(price => (
						/* <WidgetItem
              key={price.id}
              info={`от ${price.price}р`}
              icon={icon2}
              description={price.criterion}
            /> */
						<InfoMessage
							className={styles.widget}
							icon={icon2}
							iconPosition="top"
							iconDesc={`от ${price.price}р`}
							desc={price.criterion}
						/>
					))}
				</CardBody>
				<div className={styles.cardButton}>
					<NavLink to={`/expo/${event.id}`} style={{ textDecoration: "none" }}>
						<CustomBtn
							onClick={() => {
								navigate(`/expo/${event.id}`);
								window.location.reload();
							}}
						>
							Редактировать
						</CustomBtn>
					</NavLink>
				</div>
			</CardBody>
		</Card>
	);
};
