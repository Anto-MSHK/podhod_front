import * as React from "react";
import styles from "./InfoTag.module.css";

interface IInfoTagProps {
    color?: string;
    text?: string;
    icon?: string;
}

const setType = (color?: string, text?: string, icon?: string) => {
    return (
        <div
            className={`${styles.status} ${styles.status_event}`}
            style={{ backgroundColor: color }}
        >
            {icon && <img src={icon} alt={text} className={styles.status_img} />}
            {text}
        </div>
    );
};

export const InfoTag: React.FC<IInfoTagProps> = ({ color, text, icon }) => {
    return (
        <div className={styles.status_container}>
            {setType(color, text, icon)}
        </div>
    );
};
