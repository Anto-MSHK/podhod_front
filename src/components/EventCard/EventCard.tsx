import * as React from "react";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import styles from "./EventCard.module.css";
import { WidgetItem } from "../WidgetItem/WidgetItem";
import addFileIcon from "../../assets/icons/addFileIcon.svg"
import icon2 from "../../assets/icons/Wallet.svg";
import icon3 from "../../assets/icons/SmilingFace.svg";
import { InfoTag } from "../InfoTag/InfoTag";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { EventT } from "../../app/Types/EventsT";
import { useGetEventPagesQuery } from "../../app/services/EventsApi";
import { API_URL } from "../../app/http";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { number as items } from 'yup';

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
  } else if (2 <= items % 10 && items % 10 <= 4 && (items % 100 < 10 || items % 100 >= 20)) {
    return `экспоната`;
  } else {
    return `экспонатов`;
  }
}

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
          <div>
            <img className={styles.card__img} src={addFileIcon} alt="123" />
            <p
              style={{
                color: "#A8A8A8",
                fontWeight: 600,
                width: 300,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Добавьте картинку на странице редактирования
            </p>
          </div>
        ) : (
          <img
            className={
              styles.card__img + ` ${event.img.path ? styles.existImg : ""}`
            }
            src={`${API_URL}/${event.img.path}`}
            alt="123"
          />
        )}
      </div>
      <div className={styles.card_status}>
        <InfoTag status={event.status} type={event.name}/>
      </div>
      <CardBody className={styles.cardBody} inverse="true">
        <CardTitle tag="h3" className={styles.cardTitle}>
          {event.name}
        </CardTitle>
        <CardSubtitle tag="p" className="mb-2 min"></CardSubtitle>

        <CardBody className={styles.cardWidget}>
          <WidgetItem
            info={(event as any).showpieces.length}
            icon={addFileIcon}
            description={pluralForm((event as any).showpieces.length)}
          />
          {event.ageLimit && (
            <WidgetItem
              info={event.ageLimit || ""}
              icon={icon3}
              description="возраст"
            />
          )}
          {event.prices.map((price) => (
            <WidgetItem
              key={price.id}
              info={`от ${price.price}р`}
              icon={icon2}
              description={price.criterion}
            />
          ))}
        </CardBody>
        <div className={styles.cardButton}>
          <NavLink to={`/expo/${event.id}`} style={{ textDecoration: "none" }}>
            <CustomBtn
            /*  onClick={() => {
               navigate(`/expo/${event.id}`);
               window.location.reload();
             }} */
            >
              Редактировать
            </CustomBtn>
          </NavLink>
        </div>
      </CardBody>
    </Card>
  );
};
