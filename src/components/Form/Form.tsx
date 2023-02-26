import React, {useState} from 'react';
import {ButtonArt} from '../ButtonArt/ButtonArt';
import {BtnGroupSelect} from '../buttonGroup/ButtonGroup'
import {FormInput} from "./Input";
import styles from './Form.module.css'
import registerIcon from '../../assets/icons/RegisterIcon.svg'
import loginIcon from '../../assets/icons/loginIcon.svg'

export const Form = () => {
    const [organization, setOrganization] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOrganizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrganization(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {organization, email, password};
        console.log(formData); // Отправка данных
        setOrganization('')
        setEmail('')
        setPassword('')
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div>
                <BtnGroupSelect view={"radio"} data={
                    [
                        {name: 'Регистрация', icon: registerIcon},
                        {name: 'Вход', icon: loginIcon}
                    ]
                }/>
            </div>
            <div className={styles.inputsWrapper}>
                <FormInput
                    placeholder={'Название организации'}
                    value={organization}
                    onChange={handleOrganizationChange}
                    required
                />
                <FormInput
                    placeholder={'Почта'}
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    required
                />
                <FormInput
                    placeholder={'Пароль'}
                    value={password}
                    onChange={handlePasswordChange}
                    type="password"
                    minLength={8}
                    required
                />
            </div>
            <div className={styles.submitBtn}>
                <ButtonArt children={'Продолжить регистрацию'} type="submit" />
            </div>
        </form>
    );
};