import * as React from 'react';
import styles from "./PublicationStatus.module.css";
import icon5 from '../icon/Icon5.svg';
import icon6 from '../icon/Icon6.svg';

interface IPublicationStatusProps {
    status: string;
    type: string;
}

const setStatus = (status: string, type: string) => {
    if (type === 'completed') return (
        <div className={styles.status_completed}>
            <img src={icon5} alt='completed' className={styles.status_img}></img>
            {status}
        </div>
    );
    if (type === 'draft') return (
        <div className={styles.status_draft}>
            <img src={icon6} alt='draft' className={styles.status_img}></img>
            {status}
        </div>
    );
    if (type === 'event') return (
        <div className={styles.status_event}>
            {status}
        </div>
    );
};
//! Одинаковые стили - вынести основную часть!
export const PublicationStatus: React.FC<IPublicationStatusProps> = (props) => {
    return (
        <>
            {setStatus(props.status, props.type)}
        </>

    );
};
