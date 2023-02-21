import * as React from 'react';
import { Widget } from './Widget';
import icon1 from '../icon/Icon.svg';
import icon2 from '../icon/Icon2.svg';
import icon3 from '../icon/Icon3.svg';
import icon4 from '../icon/Icon4.svg';
import styles from './groupWidget.module.css';
import { PublicationStatus } from './../PublicationStatus/PublicationStatus';

interface IGroupWidgetProps {
}

export const GroupWidget: React.FunctionComponent<IGroupWidgetProps> = (props) => {
    return (
        <div className={styles.groupWidget_container}>
            <Widget info='4' icon={icon1} description='экспоната' />
            <Widget info='от 250р.' icon={icon2} description='платный вход' />
            <Widget info='6+' icon={icon3} description='возраст' />
            <Widget info='23-29' description='июля' />
            <Widget icon={icon4} description='Открытый вход' />
            <div className={styles.status}>
                <PublicationStatus status='Опубликовано' type='completed' />
                <PublicationStatus status='Черновик' type='draft' />
                <PublicationStatus status='Выставка' type='event' />
            </div>

        </div>
    );
};

