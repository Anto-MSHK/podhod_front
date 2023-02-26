import React from 'react';
import { ButtonArt } from '../ButtonArt/ButtonArt';
import { BtnGroupSelect } from '../buttonGroup/ButtonGroup'
import {FormInput} from "./Input";
import styles from './Form.module.css'

export const Form = () => {
    return (
        <div className={styles.formWrapper}>
            <BtnGroupSelect view={"radio"} data={
                [
                    {name: 'Регистрация'},
                    {name: 'Вход'}
                ]
            }
            />
            <FormInput placeholder={'Название организации'} />
            <FormInput placeholder={'Почта'}/>
            <FormInput placeholder={'Пароль'}/>
            <ButtonArt children={'Продолжить регистрацию'} className={''} onCLick={() => {}}/>
        </div>
    );
};