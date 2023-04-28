import React, {useState} from 'react';
import {ButtonArt} from '../ButtonArt/ButtonArt';
import addFileIcon from '../../assets/icons/addFileIcon.svg';
import styles from './PriceForm.module.css';
import {Formik, FormikConfig} from "formik";
import * as Yup from "yup";
import {FormInput} from "../Form/FormInput";

interface Price {
    criterion: string;
    price: number;
}

interface Props {
    onPriceAdded: (price: Price) => void;
}

const schema = Yup.object({
    criterion: Yup.string(),
    price: Yup.number().positive('Цена должна быть положительной!'),
});

export const PriceForm: React.FC<Props> = ({onPriceAdded}) => {
    const [criterion, setCriterion] = useState('');
    const [price, setPrice] = useState(0);
    const [prices, setPrices] = useState<Price[]>(JSON.parse(localStorage.getItem('prices') || '[]'));
    const handleCriterionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCriterion(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    const handleSubmit = (values: { criterion: string; price: number }) => {
        const newPrice = {criterion: values.criterion, price: Number(values.price)};
        const updatedPrices = [...prices, newPrice];
        localStorage.setItem("prices", JSON.stringify(updatedPrices));
        setPrices(updatedPrices);
        onPriceAdded(newPrice);
    };

    return (
        <div className={styles.container}>
            <div className={styles.priceSection}>
                    <Formik
                        initialValues={{criterion: "", price: 0}}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={schema}
                    >
                        {(formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <div className={styles.title}>
                                    <h2 className={styles.title__text}>Цены</h2>
                                    <div className={styles.buttonArt}>
                                        <ButtonArt
                                            icon={addFileIcon}
                                            onClick={() => {
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.inputRow}>
                                    <div className={styles.buttonRow}>
                                        <FormInput
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                handleCriterionChange(e);
                                            }}
                                            help="Категория ценообразования"
                                            placeholder="Введите название"
                                            name="criterion"
                                            value={formik.values.criterion}
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
                                            value={formik.values.price}
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
            </div>
            {JSON.parse(localStorage.getItem("prices") || "[]").map(
                (price: { criterion: string; price: number }, index: number) => (
                    <div
                        className={styles.textAndDelete}
                        key={index}
                    >
                        <span>{price.criterion}: {price.price} руб.</span>
                        <div className={styles.delete}>
                            <ButtonArt
                                icon={addFileIcon}
                                onClick={() => {
                                    const updatedPrices = prices.filter((p: {
                                        criterion: string;
                                        price: number;
                                    }) => p.criterion !== price.criterion || p.price !== price.price);
                                    localStorage.setItem("prices", JSON.stringify(updatedPrices));
                                    setPrices(updatedPrices);
                                }}
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

