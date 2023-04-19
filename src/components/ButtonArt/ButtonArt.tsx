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

    const renderArrow = () => (
        <div className={styles.arrowContainer}>
      <span className={styles.arrow}>
        <div className={styles.arrowLine} />
        <img src={Arrow} alt="arrow" />
      </span>
        </div>
    );

    return (
        <button className={buttonClassName} onClick={onClick}>
            {variant === 'arrow' && renderArrow()}
            <span className={styles.textAndIcon}>
                {text && <span className={styles.text}>{text}</span>}
                {icon && <img src={icon} alt="icon"/>}
            </span>
        </button>
    );
};
