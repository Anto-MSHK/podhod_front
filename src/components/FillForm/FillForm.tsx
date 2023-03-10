import * as React from "react";
import styles from "./FillForm.module.css";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import { useState } from "react";
import { FormContainer } from "../AuthForm/Form";
import * as Yup from "yup";
import { FormikConfig, FormikProps } from 'formik';
import { FormInput } from "../AuthForm/FormInput";
import { useAppDispatch } from '../../app/hooks';
import { setEvent } from "../../app/Slices/ExpoCreateSlice";
import { useAddEventMutation } from "../../app/services/EventsApi";
import { CreateEventPayloadT } from '../../app/Types/EventsT';
import { type } from 'os';


interface IFillFormProps { }
interface formType {
    eventName: string;
    description: string;
    age: number;
    eventType: string;
    checked: string[];
}
export const FillForm: React.FC<IFillFormProps> = (props) => {
    const Options = ["Выставка", "Экспозиция", "Показ мод"];
    const ages = [0, 6, 12, 16, 18];
    const agesOption = ages.map((age, index) => {
        return <option key={index}>{age+'+'}</option>;
    });
    const options = Options.map((text, index) => {
        return <option key={index}>{text}</option>;
    });
    const dispatch = useAppDispatch()
    const [addEvent, {isError}] = useAddEventMutation()
    const handleAddEvent = async(event: CreateEventPayloadT)=>{
        console.log('sss');
        await addEvent(event).unwrap()
    }
   

    const formConfig: FormikConfig<formType> = {
        initialValues: {
            eventName: "",
            description: "",
            age: ages[0],
            eventType: Options[0],
            checked: [],
        },
        onSubmit: (values, form) => {
            let event: CreateEventPayloadT = {
                date: new Date().toISOString(),
                description: values.description,
                name: values.eventName,
                type: 'promo-exhibition',
                prices: [
                    {
                        criterion: 'VIP',
                        price: 200,

                    }
                ]
            }
            handleAddEvent(event)
            dispatch(setEvent(values))
            form.setSubmitting(false);
            setEditing(false);
          /*   alert(JSON.stringify(values, null, 2)); */
        },
    };
    const schemaConfig: Yup.ObjectShape = {
       eventName: Yup.string()
            .required("Обязательное поле!"),
        description: Yup.string()
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
                                name="eventName"
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
