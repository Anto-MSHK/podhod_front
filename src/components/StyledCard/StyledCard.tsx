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
import { EventT } from '../../app/Types/EventsT';

interface IStyledCardProps {
    event: EventT
 /*    eventTitle: string;
    image?: string;
    dateOfCreation: string;
    type: string;
    status: string;
    numberOfExhibits: string,
    entryCost: string,
    ageRestriction: string, */
}


const btnTitle = (status: string) => {
    if (status === 'draft') return 'Продолжить заполнение';
    if (status === 'completed') return 'Опубликовать';
    if (status === 'active') return 'Статистика';
};

export const StyledCard: React.FunctionComponent<IStyledCardProps> = ({event}) => {
    return (
        <Card className={styles.styledCard_container} color="dark" inverse>
            <img src={icon3} alt="123" className={styles.card_img} />
            <div className={styles.card_status}>
                <PublicationStatus type={event.name} status={event.status} />
            </div>
            <CardBody className={styles.cardBody} inverse="true">
                <CardTitle tag="h3" className={styles.cardTitle}>
                    {event.name}
                </CardTitle>
                <CardSubtitle tag="p" className="mb-2 min">
                </CardSubtitle>
                <CardText className={styles.cardWidget}>
                    <Widget info={'1'} icon={icon1} description="экспоната" />
                    <Widget info={event.ageLimit ? event.ageLimit + '+' : '0+'} icon={icon3} description="возраст" />
                    {
                        event.prices.map((price)=>(
                            <Widget key={price.id} info={`от ${price.price}р`} icon={icon2} description={price.criterion} />
                        ))
                    }
                </CardText>
                <ButtonArt>
                    {btnTitle(event.status)}
                </ButtonArt>
            </CardBody>
        </Card>
    );
};
