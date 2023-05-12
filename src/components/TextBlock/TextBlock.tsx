import React from "react";
import styles from './TextBlock.module.css'

type TextBlockProps = {
    title: string;
    description: string;
    titleButton?: React.ReactNode;
};

export const TextBlock: React.FC<TextBlockProps> = ({ title, description, titleButton }) => {
    return (
        <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
                {titleButton && <div className={styles.button}>{titleButton}</div>}
                <span className={styles.title}>{title}</span>
            </div>
            <div className={styles.description}>{description}</div>
        </div>
    );
};
