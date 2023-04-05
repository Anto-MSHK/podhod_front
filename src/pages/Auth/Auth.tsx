import React, { useState } from 'react';
import { FormContainer } from "../../components/Form/Form";
import { CustomBtn } from "../../components/CustomBtn/CustomBtn";
import registerIcon from "../../assets/icons/RegisterIcon.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import { FormInput } from "../../components/Form/FormInput";
import { FormikConfig } from "formik";
import * as Yup from "yup";
import imageForAuth from "../../assets/pictures/imageForAuth.png";
import styles from './Auth.module.css';
import { url } from 'inspector';


const Auth = () => {
    type authPageStateT = 'login' | 'registration';
    const [authPageState, setAuthPageState] = useState<authPageStateT>('login');
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
        if (activeBtn === 'registration' && authPageState === 'login') {
            setFieldValue('organizationName', '');
            setAuthPageState('registration');
        } else {
            setFieldValue('organizationName', 'login');
            setAuthPageState('login');
        }
    };

    return (
        <div className={styles.auth_wrapper} >
            <div className={styles.auth_img_container}>
                <img className={styles.auth_img} src={imageForAuth} alt="imageForAuth" />
            </div>

            <div className={styles.auth_container}>
                <FormContainer
                    schemaConfig={schemaConfig}
                    formConfig={formConfig}
                >
                    {(formik) => (
                        <div>
                            <div className={styles.auth_btns_container}>
                                <CustomBtn
                                    icon={registerIcon}
                                    onClick={() => handleAuth('registration', formik.setFieldValue)}
                                >
                                    Регистрация
                                </CustomBtn>
                                <CustomBtn
                                    onClick={() => handleAuth('login', formik.setFieldValue)}
                                    icon={loginIcon} iconWidth={25}
                                >
                                    Вход
                                </CustomBtn>
                            </div>
                            <div className={styles.auth_form_container}>
                                {
                                    authPageState === 'registration'
                                    && <FormInput name="organizationName" lable="Название организации" />
                                }
                                <FormInput name="email" lable="Email" />
                                <FormInput
                                    name="password"
                                    lable="Пароль"
                                    help={formik.getFieldMeta('password').error ? "От 4 до 12 символов" : ''}
                                />
                            </div>
                            <div className={styles.auth_submit_btn_container}>
                                <CustomBtn disabled={(Object.keys(formik.errors).length > 0)} type='submit'>
                                    {authPageState === 'registration' ? 'Продолжить регистрацию' : 'Войти'}
                                </CustomBtn>
                            </div>
                        </div>)}
                </FormContainer>
            </div>
        </div>
    );
};
{/*  */ }
export default Auth;
