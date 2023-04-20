import styles from './ButtonArt.module.css';
import Arrow from '../../assets/icons/Arrow.svg';

type ButtonSize = 'normal' | 'small';
type ButtonVariant = 'arrow' | 'text' | 'icon' | 'textAndIcon';

interface ButtonProps {
    size: ButtonSize;
    variant: ButtonVariant;
    onClick: () => void;
    text?: string;
    icon?: string;
}

export const ButtonArt = ({ size, variant, onClick, text, icon }: ButtonProps) => {
    const buttonClassName = `${styles.button} ${styles[size]} ${styles[variant]}`;

    if (variant === 'arrow') {
        return (
            <button className={`${styles.button_wrapper} ${styles.arrow}`}>
                <span className={styles.button_text}>{text}</span>
                <div className={styles.arrow_container}>
                    <div className={styles.arrow_line_container}>
                        <hr className={styles.arrow_line} style={{ flexGrow:'1', borderTop: "2px solid white", color: 'white', backgroundColor: 'white' }} />
                        <img src={Arrow} className={styles.arrow_tip} alt="arrow" />
                    </div>
                    <div className={styles.arrow_tip_container} >
                    </div>
                </div>
            </button>
        )
    }

    return (
        <button className={buttonClassName} onClick={onClick}>
            <span className={styles.textAndIcon}>
                {text && <span className={styles.text}>{text}</span>}
                <img src={icon} alt="icon" />
            </span>
        </button>
    );
};
