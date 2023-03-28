import * as React from "react";
import styles from "./PublicationStatus.module.css";
import icon5 from "../../assets/icons/CheckmarkInСircle.svg";
import icon6 from "../../assets/icons/CrossInCircle.svg";

interface IPublicationStatusProps {
    status: string;
    type: string;
}

const setType = (type: string) => {
    return (
        <div className={`${styles.status} ${styles.status_event}`}>{type}</div>
    );
};

const setStatus = (status: string) => {
    if (status === "published")
        return (
            <div className={`${styles.status} ${styles.status_completed}`}>
                <img src={icon5} alt="completed" className={styles.status_img}></img>
                Опубликовано
            </div>
        );
    if (status === "completed")
        return (
            <div className={`${styles.status} ${styles.status_completed}`}>
                <img src={icon5} alt="completed" className={styles.status_img}></img>
                Готово к публикации
            </div>
        );
    if (status === "draft")
        return (
            <div className={`${styles.status} ${styles.status_draft}`}>
                <img src={icon6} alt="draft" className={styles.status_img}></img>
                Это черновик
            </div>
        );
};
export const PublicationStatus: React.FC<IPublicationStatusProps> = (props) => {
    return (
        <div className={styles.status_container}>
            {setType(props.type)}
            {setStatus(props.status)}
        </div>
    );
};
