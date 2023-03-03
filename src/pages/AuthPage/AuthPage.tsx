import React, { useState } from 'react';
import { FormContainer } from "../../components/AuthForm/Form";
import { ButtonArt } from "../../components/ButtonArt/ButtonArt";
import registerIcon from "../../assets/icons/RegisterIcon.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import { FormInput } from "../../components/AuthForm/FormInput";
import { FormikConfig } from "formik";
import * as Yup from "yup";
import imageForAuth from "../../assets/pictures/backGroundImg.svg"
import styles from './AuthPage.module.css';
import { url } from 'inspector';







const AuthPage = () => {
    type authPageStateT = 'login' | 'registration'
    const [authPageState, setAuthPageState] = useState<authPageStateT>('login')
    const formConfig: FormikConfig<any> = {
        initialValues: {
            organizationName: "",
            email: "",
            password: "",
        },
        onSubmit: (values) => {

            alert(JSON.stringify(values, null, 2));
        },
    };

    const schemaConfig: Yup.ObjectShape = {
        organizationName: Yup.string()
            .required("Обязательное поле!"),
        email: Yup.string()
            .email("Некорректная почта!")
            .required("Обязательное поле!"),
        password: Yup.string()
            .min(4, "Минимум 4 символа!")
            .max(12, "Максимум 12 символов!")
            .required("Обязательное поле!"),
    };

    const handleAuth = (
        activeBtn: authPageStateT,
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
    ) => {

        if (activeBtn === 'registration' && authPageState !== 'registration') {
            setFieldValue('organizationName', '')
            setAuthPageState('registration')
        } else if (activeBtn === 'login' && authPageState !== 'login')  {
            setFieldValue('organizationName', 'login')
            setAuthPageState('login')
        }
    }

    return (
        <div className={styles.auth_wrapper} >
            <img className={styles.auth_img} src={imageForAuth} alt="imageForAuth" />
            <div className={styles.auth_container}>
                <FormContainer
                    schemaConfig={schemaConfig}
                    formConfig={formConfig}
                >
                    {(formik) => (
                        <div>
                            <div className={styles.auth_btns_container}>
                                <ButtonArt
                                    icon={registerIcon}
                                    onClick={() => handleAuth('registration', formik.setFieldValue)}
                                    inActiveStyle={authPageState === 'login'}
                                >
                                    Регистрация
                                </ButtonArt>
                                <ButtonArt
                                    onClick={() => handleAuth('login', formik.setFieldValue)}
                                    icon={loginIcon} iconWidth={25}
                                    inActiveStyle={authPageState === 'registration'}
                                >Вход
                                </ButtonArt>
                            </div>
                            <div className={styles.auth_form_container}>
                                {
                                    authPageState === 'registration'
                                    && <FormInput name="organizationName" label="Название организации" />
                                }
                                <FormInput name="email" label="Email" />
                                <FormInput
                                    name="password"
                                    label="Пароль"
                                    help={formik.getFieldMeta('password').error ? "От 4 до 12 символов" : ''}
                                />
                            </div>
                            <div className={styles.auth_submit_btn_container}>
                                <ButtonArt disabled={Object.keys(formik.errors).length > 0} type='submit'>
                                    {authPageState === 'registration' ? 'Продолжить регистрацию' : 'Войти'}
                                </ButtonArt>
                            </div>
                        </div>)}
                </FormContainer>
            </div>
        </div>
    );
};
{/*  */ }
export default AuthPage;