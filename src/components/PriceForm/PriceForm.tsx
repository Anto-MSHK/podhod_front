import React, { useState } from "react";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import styles from "./PriceForm.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../Form/FormInput";
import Delete from "../../assets/icons/Delete.svg";
import Plus from "../../assets/icons/Plus.svg";
import axios from "axios";
import { useUpdatePricesMutation } from "../../app/services/PricesApi";
import { useParams } from "react-router-dom";

interface Price {
	criterion: string;
	price: number;
}

interface Props {
	onPriceAdded: (price: Price, prices: Price[]) => void;
	disabled?: boolean;
	eventId?: string;
}

const schema = Yup.object({
	criterion: Yup.string().required("Это поле должно быть заполнено"),
	price: Yup.number()
		.required("Это поле должно быть заполнено")
		.typeError("Цена должна быть числом")
		.nullable()
		.positive("Цена должна быть положительной!"),
});

export const PriceForm: React.FC<Props> = ({
																						 disabled,
																						 onPriceAdded,
																						 eventId,
																					 }) => {
	const { id } = useParams<{ id: string }>();
	const [criterion, setCriterion] = useState("");
	const [price, setPrice] = useState(0);
	const [prices, setPrices] = useState<Price[]>([]);
	const [updatePricesMutation] = useUpdatePricesMutation();

	const handleCriterionChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCriterion(event.target.value);
	};

	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(event.target.value));
	};

	const handleAddPrice = async (eventId: string | undefined, values: any) => {
		// Extract criterion and price from the form values
		const { criterion, price } = values;

		const newPrice = { criterion, price };
		const updatedPrices = [...prices, newPrice];
		setPrices(updatedPrices);
		onPriceAdded(newPrice, updatedPrices);
		setCriterion("");
		setPrice(0);
		if (eventId) {
			try {
				await updatePricesMutation({ id: eventId, prices: updatedPrices });
			} catch (error) {
				console.error(error);
			}
		}
		console.log(updatedPrices);
	};


	const handleDeletePrice = (priceToDelete: Price) => {
		const updatedPrices = prices.filter(
			(p: Price) =>
				p.criterion !== priceToDelete.criterion || p.price !== priceToDelete.price
		);
		setPrices(updatedPrices);
		onPriceAdded(priceToDelete, updatedPrices);
	};

	return (
		<div className={styles.container}>
			<Formik
				initialValues={{ criterion: "", price: "" }}
				onSubmit={(values) => handleAddPrice(eventId, values)}
				validationSchema={schema}
			>
				{(formik) => (
					<div className={styles.container}>
						<div className={styles.title}>
							<h2 className={styles.title__text}>Цены</h2>
							<div className={styles.buttonArt}>
								<ButtonArt icon={Plus} onClick={() => handleAddPrice(eventId, formik.values)} />
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
					</div>
				)}
				</Formik>
				{prices.map((price: Price, index: number) => (
					<div className={styles.textAndDelete} key={index}>
						<span>{price.criterion}: {price.price} руб.</span>
						<div className={styles.delete}>
							<ButtonArt icon={Delete} onClick={() => {handleDeletePrice(price)}} />
						</div>
					</div>
				))}
			</div>
	);
};

