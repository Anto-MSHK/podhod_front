import * as React from 'react';
import styles from './groupWidget.module.css';

interface IGroupWidgetProps {
}

export const GroupWidget: React.FunctionComponent<IGroupWidgetProps> = (props) => {
    return (
        <div className={styles.groupWidget_container}>
        </div>
    );
};

