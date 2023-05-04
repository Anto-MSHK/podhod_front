import React, { useState } from "react";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import styles from "./PriceForm.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../Form/FormInput";
import Delete from "../../assets/icons/Delete.svg";
import Plus from "../../assets/icons/Plus.svg";
import axios from "axios";

interface Price {
	criterion: string;
	price: number;
}

interface Props {
	onPriceAdded: (price: Price) => void;
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

const updatePrices = async (eventId: string, prices: Price[]) => {
	try {
		const response = await axios.put(`/events/${eventId}/prices`, prices);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export const PriceForm: React.FC<Props> = ({ disabled, onPriceAdded, eventId }) => {
	const [criterion, setCriterion] = useState("");
	const [price, setPrice] = useState(0);
	const [prices, setPrices] = useState<Price[]>(JSON.parse(localStorage.getItem("prices") || "[]"));

	const handleCriterionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCriterion(event.target.value);
	};

	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(event.target.value));
	};
	const updatePrices = async (eventId: string, prices: Price[]) => {
		try {
			const response = await axios.put(`/events/${eventId}/prices`, prices);
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
			<div className={styles.container}>
				<Formik
						initialValues={{ criterion: "", price: "" }}
						onSubmit={async (values, { resetForm, setFieldValue }) => {
							const newPrice = { criterion: values.criterion, price: Number(values.price) };
							const updatedPrices = [...prices, newPrice];
							localStorage.setItem("prices", JSON.stringify(updatedPrices));
							setPrices(updatedPrices);
							onPriceAdded(newPrice);
							resetForm();
							if (eventId) {
								await updatePrices(eventId, updatedPrices);
							}
						}}
						validationSchema={schema}
				>

					{(formik) => (
							<form>
								<div className={styles.title}>
									<h2 className={styles.title__text}>Цены</h2>
									<div className={styles.buttonArt}>
										<ButtonArt
												icon={Plus}
												onClick={formik.handleSubmit}
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
				{JSON.parse(localStorage.getItem("prices") || "[]").map(
						(price: { criterion: string; price: number }, index: number) => (
								<div
										className={styles.textAndDelete}
										key={index}
								>
									<span>{price.criterion}: {price.price} руб.</span>
									<div className={styles.delete}>
										<ButtonArt
												icon={Delete}
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
						),
				)}
			</div>
	);
};

