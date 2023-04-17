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

    return (
        <button className={buttonClassName} onClick={onClick}>
            {variant === 'arrow' && (
                <>
                    <span className={styles.text}></span>
                    <div className={styles.arrowContainer}>
                        <span className={styles.arrow}>
                            <div className={styles.arrowLine} />
              <img src={Arrow} alt="arrow" />
            </span>
                    </div>
                </>
            )}
            {variant === 'icon' || variant === 'textAndIcon' ? (
                <span className={styles.textAndIcon}>
                    {text && <span className={styles.text}>{text}</span>}
                    <img src={icon} alt="icon" />

                </span>
            ) : (
                text
            )}
        </button>
    );
};
