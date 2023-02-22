import * as React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import styles from './StyledCard.module.css';
import img1 from '../pictures/Rectangle13.png';
import { Widget } from '../Widget/Widget';
import icon1 from '../icon/Icon.svg';
import icon2 from '../icon/Icon2.svg';
import icon3 from '../icon/Icon3.svg';
import { PublicationStatus } from './../PublicationStatus/PublicationStatus';

interface IStyledCardProps {
    eventTitle: string;
    dateOfCreation: string;
}

export const StyledCard: React.FunctionComponent<IStyledCardProps> = (props) => {
    return (
        <Card className={styles.styledCard_container} color='dark' inverse>
            <img src={img1} alt="123" className={styles.card_img} />
            <div className={styles.card_status}>
                <PublicationStatus status='Выставка' type='event' />
                <PublicationStatus status='Черновик' type='draft' />
            </div>
            <CardBody className={styles.cardBody} inverse='true'>
                <CardTitle tag='h5'>
                    {props.eventTitle}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    Дата создания: {props.dateOfCreation}
                </CardSubtitle>
                <CardText className={styles.cardWidget}>
                    <Widget info='4' icon={icon1} description='экспоната' />
                    <Widget info='от 250р.' icon={icon2} description='платный вход' />
                    <Widget info='6+' icon={icon3} description='возраст' />
                </CardText>
                <Button className={styles.card_button}>
                    Продолжить заполнение
                </Button>
            </CardBody>
        </Card>
    );
};
