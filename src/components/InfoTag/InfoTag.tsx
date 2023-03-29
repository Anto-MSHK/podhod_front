import * as React from "react";
import styles from "./InfoTag.module.css";

interface IInfoTagProps {
    status: string;
    type: string;
    color?: string;
    text?: string;
    icon?: string;
}

const setType = (type: string, color?: string, text?: string, icon?: string) => {
    return (
        <div className={`${styles.status} ${styles.status_event}`} style={{backgroundColor: color}}>
            {icon && <img src={icon} alt={text} className={styles.status_img}/>}
            {text || type}
        </div>
    );
};

const setStatus = (status: string, type: string, color?: string, text?: string, icon?: string) => {
    if (status === "published")
        return (
            <div className={`${styles.status} ${styles.status_completed}`} style={{backgroundColor: color}}>
                {setType(type, color, text, icon)}
                {text || "Опубликовано"}
            </div>
        );
    if (status === "completed")
        return (
            <div className={`${styles.status} ${styles.status_completed}`} style={{backgroundColor: color}}>
                {setType(type, color, text, icon)}
                {text || "Готово к публикации"}
            </div>
        );
    if (status === "draft")
        return (
            <div className={`${styles.status} ${styles.status_draft}`} style={{backgroundColor: color}}>
                {setType(type, color, text, icon)}
                {text || "Это черновик"}
            </div>
        );
};

export const InfoTag: React.FC<IInfoTagProps> = ({status, type, color, text, icon}) => {
    return (
        <div className={styles.status_container}>
            {setType(type, color, text, icon)}
            {setStatus(status, type, color, text, icon)}
        </div>
    );
};

