import * as React from 'react';
import styles from './FillForm.module.css';
import { ButtonArt } from './../ButtonArt/ButtonArt';
import { Input } from 'reactstrap';
import { CheckBox } from '../CheckBox/CheckBox';
import { useState } from 'react';

interface IFillFormProps {
}

export const FillForm: React.FC<IFillFormProps> = (props) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [change, setChange] = useState('Изменить');

    const saveFillForm = () => {
    };

    const changeForm = (text: string) => {
        if (text === 'Изменить') {
            setDisabled(false);
            setChange('Сохранить');
        }
        if (text === 'Сохранить') {
            setDisabled(true);
            setChange('Изменить');
            saveFillForm();
        }
    };

    const Options = ['1', '2', '3'];

    const options = Options.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    return (
        <div className={styles.fillForm_container}>
            <div className={styles.asd}>
                <h2>Информация</h2>
                <ButtonArt className={styles.formBtn} onCLick={() => changeForm(change)}>{change}</ButtonArt>
            </div>
            <div className={styles.form_info}>
                <div className={styles.left}>
                    <h3>Название:</h3>
                    <Input disabled={disabled} className={styles.formControl}></Input>
                    <h3>Описание:</h3>
                    <Input type='textarea' disabled={disabled} className={styles.formControl}></Input>
                </div>
                <div className={styles.right}>
                    <h3>Возраст:</h3>
                    <Input className={styles.formControl} disabled={disabled}></Input>
                    <h3>Тип события:</h3>
                    <Input type='select' disabled={disabled} className={styles.formControl}>
                        {options}
                    </Input>
                    <CheckBox checkBoxId='1' text='Показывать логотип' disabled={disabled} />
                    <CheckBox checkBoxId='2' text='Показывать тип события' disabled={disabled} />
                </div>
            </div>
        </div>
    );
};

