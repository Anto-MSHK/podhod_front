import React from 'react';
import {FormContainer} from "../../components/AuthForm/Form";
import {ButtonArt} from "../../components/ButtonArt/ButtonArt";
import registerIcon from "../../assets/icons/RegisterIcon.svg";
import loginIcon from "../../assets/icons/loginIcon.svg";
import {FormInput} from "../../components/AuthForm/FormInput";
import {FormikConfig} from "formik";
import * as Yup from "yup";
import imageForAuth from "../../assets/pictures/imageForAuth.png"
import "../../styles/normalize.css";


const formConfig: FormikConfig<any> = {
    initialValues: {
        email: "",
        password: "",
    },
    onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
    },
};

const schemaConfig: Yup.ObjectShape = {
    email: Yup.string()
        .email("Некорректная почта!")
        .required("Обязательное поле!"),
    password: Yup.string()
        .min(4, "Минимум 4 символа!")
        .max(12, "Максимум 12 символов!")
        .required("Обязательное поле!"),
};


const AuthPage = () => {
    return (
        <><img className="ath" src={imageForAuth} alt="imageForAuth"/>
            <div className="auth">
                <FormContainer
                    schemaConfig={schemaConfig}
                    formConfig={formConfig}
                >
                    {(formik) => (
                        <div>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <ButtonArt icon={registerIcon} type='submit'>Зарегистрироваться</ButtonArt>
                                <ButtonArt icon={loginIcon} iconWidth={25} style={{
                                    backgroundColor: '#282828 !important',
                                    border: '2px solid #282828'
                                }}>Выйти</ButtonArt>
                            </div>

                            <FormInput name="email" label="Email"/>
                            <FormInput
                                name="password"
                                label="Пароль"
                                help="От 4 до 12 символов"/>
                        </div>
                    )}
                </FormContainer>
            </div>
        </>
    );
};

export default AuthPage;