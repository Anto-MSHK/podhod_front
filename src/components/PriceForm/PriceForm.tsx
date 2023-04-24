import React, { useState } from 'react';
import { ButtonArt } from '../ButtonArt/ButtonArt';
import addFileIcon from '../../assets/icons/addFileIcon.svg';
import styles from './PriceForm.module.css';
import { FormContainer } from "../Form/Form";
import { Formik, FormikConfig } from "formik";
import * as Yup from "yup";
import { FormInput } from "../Form/FormInput";

interface Price {
    criterion: string;
    price: number;
}

interface Props {
    onPriceAdded: (price: Price) => void;
}

const schema = Yup.object({
    criterion: Yup.string().required('Обязательное поле!'),
    price: Yup.number().required('Обязательное поле!').positive('Цена должна быть положительной!'),
});

export const PriceForm: React.FC<Props> = ({ onPriceAdded }) => {
    const [criterion, setCriterion] = useState('');
    const [price, setPrice] = useState(0);

    const handleCriterionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCriterion(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    const handleSubmit = (values: { criterion: string, price: number }) => {
        const newPrice = { criterion: values.criterion, price: Number(values.price) };
        onPriceAdded(newPrice);
        setCriterion('');
        setPrice(0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.priceSection}>
                <div className={styles.title}>
                    <h2 className={styles.title__text}>Цены</h2>
                    <div className={styles.buttonArt}>
                        <ButtonArt
                            onClick={() => handleSubmit({ criterion, price })}
                            icon={addFileIcon}
                        />
                    </div>
                </div>
                <div >
                    <Formik
                        initialValues={{ criterion: '', price: 0 }}
                        onSubmit={handleSubmit}
                        validationSchema={schema}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <div className={styles.inputRow}>
                                    <div className={styles.buttonRow}>
                                        <FormInput
                                            onChange={(e) => { formik.handleChange(e); handleCriterionChange(e); }}
                                            help="Категория ценообразования"
                                            placeholder="Введите название"
                                            name="criterion"
                                            value={criterion}
                                        />
                                    </div>
                                    <div className={styles.buttonRow}>
                                        <FormInput
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                handlePriceChange(e);
                                            }}
                                            placeholder="Введите цену"
                                            help="В рублях"
                                            name="price"
                                            type="number"
                                            value={formik.values.price}
                                        />
                                    </div>
                                </div>
                                <button type="submit" style={{ display: 'none' }} />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
