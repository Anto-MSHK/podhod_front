import * as React from 'react';
import styles from './FillForm.module.css';
import { ButtonArt } from '../ButtonArt/ButtonArt';
import { useState } from 'react';
import { FormContainer } from '../AuthForm/Form';
import * as Yup from 'yup';
import { FormikConfig } from 'formik';
import { FormInput } from '../AuthForm/FormInput';


interface IFillFormProps {
}

export const FillForm: React.FC<IFillFormProps> = (props) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const Options = ['Выставка', 'Экспозиция', 'Показ мод'];
    const ages = ['0+', '6+', "12+", "16+", '18+']
    const agesOption = ages.map((age, index) => {
        return <option key={index}>{age}</option>
    })
    const options = Options.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    const formConfig: FormikConfig<any> = {
        initialValues: {
            organizationName: "",
            description: "",
            age: ages[0],
            eventType: Options[0],
            checked: []
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    };
    const schemaConfig: Yup.ObjectShape = {
        organizationName: Yup.string()
            /* .email("Некорректная почта!") */
            .required("Обязательное поле!"),
        description: Yup.string()
            /* .min(4, "Минимум 4 символа!")
            .max(12, "Максимум 12 символов!") */
            .required("Обязательное поле!"),
        age: Yup.string()
            .required("Обязательное поле!"),
        eventType: Yup.string()
            .required("Обязательное поле!"),
    };

    const changeForm = () => {
        setDisabled(!disabled)
    };


    return (
        <FormContainer
            schemaConfig={schemaConfig}
            formConfig={formConfig}
            textButtonSubmit='Подтвердить'
        >
            <div className={styles.fillForm_container}>
                <div className={styles.asd}>
                    <h2>Информация</h2>
                    <ButtonArt type={disabled ? 'submit' : 'button'} className={styles.formBtn} onClick = {changeForm}>{disabled ? 'Изменить' : 'Сохранить'}</ButtonArt>
                </div>
                <div className={styles.form_info}>
                    <div className={styles.left}>
                        <FormInput name="organizationName"
                            label="Название:"
                            disabled={disabled}
                        />
                        <FormInput
                            name="description"
                            label="Описание:"
                            type='textarea'
                            disabled={disabled}
                        />
                    </div>
                    <div className={styles.right}>
                        <FormInput
                            name="age"
                            label="Возраст:"
                            type='select'
                            disabled={disabled}
                        >
                            {agesOption}
                        </FormInput>
                        <FormInput
                            name="eventType"
                            label="Тип события:"
                            type='select'
                            disabled={disabled}
                        >
                            {options}
                        </FormInput>
                        <FormInput
                            name="checked"
                            label="Показать логотип:"
                            type='checkbox'
                            value={'showLogo'}
                            disabled={disabled}
                        />
                        <FormInput
                            name="checked"
                            label="Показать тип события:"
                            type='checkbox'
                            value={'showEventType'}
                            disabled={disabled}
                        />
                    </div>
                </div>

            </div>
        </FormContainer>
    );
};
