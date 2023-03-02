import * as React from "react";
import styles from "./FillForm.module.css";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import { useState } from "react";
import { FormContainer } from "../AuthForm/Form";
import * as Yup from "yup";
import { FormikConfig, FormikProps } from 'formik';
import { FormInput } from "../AuthForm/FormInput";

interface IFillFormProps { }

export const FillForm: React.FC<IFillFormProps> = (props) => {
    const Options = ["Выставка", "Экспозиция", "Показ мод"];
    const ages = ["0+", "6+", "12+", "16+", "18+"];
    const agesOption = ages.map((age, index) => {
        return <option key={index}>{age}</option>;
    });
    const options = Options.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    interface formType {
        organizationName: string;
        description: string;
        age: string;
        eventType: string;
        checked: boolean[];
    }
    const formConfig: FormikConfig<formType> = {
        initialValues: {
            organizationName: "",
            description: "",
            age: ages[0],
            eventType: Options[0],
            checked: [],
        },
        onSubmit: (values, form) => {
            form.setSubmitting(false);
            setEditing(false);
            alert(JSON.stringify(values, null, 2));
        },
    };
    const schemaConfig: Yup.ObjectShape = {
        organizationName: Yup.string()
            .email("Некорректная почта!")
            .required("Обязательное поле!"),
        description: Yup.string()
            /* .min(4, "Минимум 4 символа!")
                  .max(12, "Максимум 12 символов!") */
            .required("Обязательное поле!"),
        age: Yup.string().required("Обязательное поле!"),
        eventType: Yup.string().required("Обязательное поле!"),
    };

    const [editing, setEditing] = useState(false);

    const toggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
            {(formik) => (
                <div className={styles.fillForm_container}>
                    <div className={styles.asd}>
                        <h2>{`Информация`}</h2>
                        <div style={{ display: "flex", gap: 15 }}>
                            {editing && (
                                <ButtonArt
                                    type="submit"
                                    disabled={
                                        !editing ||
                                        formik.isSubmitting ||
                                        Object.keys(formik.errors).length > 0 ||
                                        Object.keys(formik.touched).length === 0
                                    }
                                >
                                    {editing ? "Сохранить" : "Изменить"}
                                </ButtonArt>
                            )}
                            <ButtonArt type="button" onClick={toggleEditing}>
                                {editing ? "Отмена" : "Редактировать"}
                            </ButtonArt>
                        </div>
                    </div>
                    <div className={styles.form_info}>
                        <div className={styles.left}>
                            <FormInput
                                name="organizationName"
                                label="Название:"
                                disabled={!editing}
                            />
                            <FormInput
                                name="description"
                                label="Описание:"
                                type="textarea"
                                disabled={!editing}
                            />
                        </div>
                        <div className={styles.right}>
                            <FormInput
                                name="age"
                                label="Возраст:"
                                type="select"
                                disabled={!editing}
                            >
                                {agesOption}
                            </FormInput>
                            <FormInput
                                name="eventType"
                                label="Тип события:"
                                type="select"
                                disabled={!editing}
                            >
                                {options}
                            </FormInput>
                            <FormInput
                                name="checked"
                                label="Показать логотип:"
                                type="checkbox"
                                value={"showLogo"}
                                disabled={!editing}
                            />
                            <FormInput
                                name="checked"
                                label="Показать тип события:"
                                type="checkbox"
                                value={"showEventType"}
                                disabled={!editing}
                            />
                        </div>
                    </div>
                </div>
            )}
        </FormContainer>
    );
};
