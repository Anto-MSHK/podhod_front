import React, {FC, useState, ChangeEvent, FormEvent} from 'react';
import {ButtonArt} from '../ButtonArt/ButtonArt';
import {BtnGroupSelect, btnGroup} from '../ButtonGroup/ButtonGroup';
import {AuthInput} from './AuthInput';
import styles from './AuthForm.module.css';
import registerIcon from '../../assets/icons/RegisterIcon.svg';
import loginIcon from '../../assets/icons/loginIcon.svg';

interface FormDataI {
    organization: string;
    email: string;
    password: string;
}

enum FormMode {
    Register = 'register',
    Login = 'login',
}

export const AuthForm: FC = () => {
    const [formData, setFormData] = useState<FormDataI>({organization: '', email: '', password: ''});
    const [formMode, setFormMode] = useState<FormMode>(FormMode.Register);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: Partial<FormDataI> = {
            email: formData.email,
            password: formData.password,
        };

        if (formMode === FormMode.Register) {
            data.organization = formData.organization;
        }

        console.log(data);
        setFormData({organization: '', email: '', password: ''});
    };


    const handleModeChange = (mode: FormMode) => {
        setFormMode(mode);
    };

    const formBtns: btnGroup = [
        {name: 'Регистрация', icon: registerIcon, onClick: () => handleModeChange(FormMode.Register)},
        {name: 'Вход', icon: loginIcon, onClick: () => handleModeChange(FormMode.Login)},
    ];

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div>
                <BtnGroupSelect view="radio" data={formBtns}/>
            </div>
            <div className={styles.AuthInputsWrapper}>
                {formMode === FormMode.Register && (
                    <AuthInput
                        placeholder="Название организации"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        required
                    />
                )}
                <AuthInput
                    placeholder="Почта"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                />
                <AuthInput
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
                <ButtonArt children={formMode === FormMode.Register ? "Продолжить регистрацию" : "Войти"} type="submit"/>
            </div>
        </form>
    );
};
