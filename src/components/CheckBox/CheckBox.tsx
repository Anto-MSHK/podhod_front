import * as React from 'react';
import styles from './CheckBox.module.css';

interface ICheckBoxProps {
    checkBoxId: string;
    text: string;
    disabled: boolean;
}

export const CheckBox: React.FC<ICheckBoxProps> = (props) => {
    return (
        <>
            <input type='checkbox' className={styles.checkbox} id={props.checkBoxId} disabled={props.disabled}></input><label htmlFor={props.checkBoxId}>{props.text}</label>
        </>
    );
};

