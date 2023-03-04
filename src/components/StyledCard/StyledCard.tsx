import * as React from "react";
import {
    Card,
    CardBody,
    CardSubtitle,
    CardText,
    CardTitle,
} from "reactstrap";
import styles from "./StyledCard.module.css";
import { Widget } from "../Widget/Widget";
import icon1 from "../../assets/icons/Icon.svg";
import icon2 from "../../assets/icons/Icon2.svg";
import icon3 from "../../assets/icons/Icon3.svg";
import { PublicationStatus } from "../PublicationStatus/PublicationStatus";
import { ButtonArt } from "../ButtonArt/ButtonArt";

interface IStyledCardProps {
    eventTitle: string;
    image?: string;
    dateOfCreation: string;
    type: string;
    status: string;
    numberOfExhibits: string,
    entryCost: string,
    ageRestriction: string,
}


const btnTitle = (status: string) => {
    if (status === 'draft') return 'Продолжить заполнение';
    if (status === 'completed') return 'Опубликовать';
    if (status === 'published') return 'Статистика';
};

export const StyledCard: React.FunctionComponent<IStyledCardProps> = (props) => {
    return (
        <Card className={styles.styledCard_container} color="dark" inverse>
            <img src={props.image} alt="123" className={styles.card_img} />
            <div className={styles.card_status}>
                <PublicationStatus type={props.type} status={props.status} />
            </div>
            <CardBody className={styles.cardBody} inverse="true">
                <CardTitle tag="h3" className={styles.cardTitle}>
                    {props.eventTitle}
                </CardTitle>
                <CardSubtitle tag="p" className="mb-2 min">
                    Дата создания: {props.dateOfCreation}
                </CardSubtitle>
                <CardText className={styles.cardWidget}>
                    <Widget info={props.numberOfExhibits} icon={icon1} description="экспоната" />
                    <Widget info={`от ${props.entryCost}р`} icon={icon2} description="платный вход" />
                    <Widget info={`${props.ageRestriction}+`} icon={icon3} description="возраст" />
                </CardText>
                <ButtonArt>
                    {btnTitle(props.status)}
                </ButtonArt>
            </CardBody>
        </Card>
    );
};
