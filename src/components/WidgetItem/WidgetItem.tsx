import * as React from 'react';
import styles from './WidgetItem.module.css';

interface IwidgetProps {
    info?: string;
    icon?: string;
    description?: string;
}
//?Придумать способ устанавливать ширину/высоту как inherit + ?px
//! если не приходит img - убирать элемент

export const WidgetItem: React.FunctionComponent<IwidgetProps> = (props) => {
    return (
        <div className={styles.widget_container}>
            <div className={styles.info}>
                <img src={props?.icon} alt={props?.info} className={styles.widget_img} />
                <div className={styles.text}>{props?.info}</div>
            </div>
            <div className={styles.info}>
                {props?.description}
            </div>
        </div>
    );
};
