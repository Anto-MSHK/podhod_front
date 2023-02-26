import React, {FC, useState, ChangeEvent, FormEvent} from 'react';
import {ButtonArt} from '../ButtonArt/ButtonArt';
import {BtnGroupSelect, btnGroup} from '../buttonGroup/ButtonGroup';
import {FormInput} from './Input';
import styles from './Form.module.css';
import registerIcon from '../../assets/icons/RegisterIcon.svg';
import loginIcon from '../../assets/icons/loginIcon.svg';

interface FormDataI {
    organization: string;
    email: string;
    password: string;
}

export const Form: FC = () => {
    const [formData, setFormData] = useState<FormDataI>({organization: '', email: '', password: ''});

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData); // Отправка данных
        setFormData({organization: '', email: '', password: ''});
    };

    const formBtns: btnGroup = [
        {name: 'Регистрация', icon: registerIcon},
        {name: 'Вход', icon: loginIcon},
    ];

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div>
                <BtnGroupSelect view="radio" data={formBtns}/>
            </div>
            <div className={styles.inputsWrapper}>
                <FormInput
                    placeholder="Название организации"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    placeholder="Почта"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                />
                <FormInput
                    placeholder="Пароль"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    minLength={8}
                    required
                />
            </div>
            <div className={styles.submitBtn}>
                <ButtonArt children="Продолжить регистрацию" type="submit"/>
            </div>
        </form>
    );
};