import styles from './ButtonArt.module.css';
import Arrow from '../../assets/icons/Arrow.svg';
import React from 'react';
var classNames = require('classnames')


interface ButtonProps {
    arrow?: boolean;
    round?: boolean;
    text?: string | undefined | null;
    icon?: string;
    className?: string,
    onClick?: () => void;
}

export const ButtonArt: React.FC<ButtonProps> = ({  round = false, arrow = false, onClick, text, icon, className = '' }) => {

    const classes = classNames(
        className,
        styles.button_wrapper,
        { [styles.arrow]: arrow },
        { [styles.round]: round },
    )

    if (arrow) {
        return (
            <button className={classes}>
                <span className={styles.button_text}>{text}</span>
                <div className={styles.arrow_container}>
                    <div className={styles.arrow_line_container}>
                        <hr className={styles.arrow_line} />
                        <img src={Arrow} className={styles.arrow_tip} alt="arrow" />
                    </div>
                    <div className={styles.arrow_tip_container} >
                    </div>
                </div>
            </button>
        )
    }

    return (
        <button className={classes} onClick={onClick}>
            <div className={styles.button_container}>
                {text && <span className={styles.text}>{text}</span>}
                {icon && <img src={icon} className={styles.icon} alt="icon" />}
            </div>
        </button>
    );
};
