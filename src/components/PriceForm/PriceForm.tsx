import React, { useEffect, useState } from "react";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import styles from "./PriceForm.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormInput } from "../Form/FormInput";
import Delete from "../../assets/icons/Delete.svg";
import Plus from "../../assets/icons/Plus.svg";
import { useUpdatePricesMutation } from "../../app/services/PricesApi";
import { useParams } from "react-router-dom";
import { useFetchEventQuery } from "../../app/services/EventsApi";

interface Price {
	criterion: string;
	price: number;
}

interface Props {
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

export const PriceForm: React.FC<Props> = ({ disabled, eventId }) => {
	const { id } = useParams<{ id: string }>();
	const { data, refetch } = useFetchEventQuery(id);
	const [criterion, setCriterion] = useState("");
	const [price, setPrice] = useState(0);
	const [prices, setPrices] = useState<Price[]>([]);
	const [updatePricesMutation] = useUpdatePricesMutation();

	useEffect(() => {
		if (data) {
			setPrices(data.prices || []);
		}
	}, [data, refetch]);

	const handleCriterionChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCriterion(event.target.value);
	};

	const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(Number(event.target.value));
	};

	const handleAddPrice = async (eventId: string | undefined, values: any) => {
		const { criterion, price } = values;

		try {
			await schema.validate({ criterion, price }, { abortEarly: false });
		} catch (error) {
			console.error("Validation error:", error);
			return;
		}

		const newPrice = { criterion, price };
		const updatedPrices = [...prices, newPrice];

		if (eventId) {
			const allPrices = [...prices, newPrice];
			try {
				await updatePricesMutation({ id: eventId, prices: allPrices });
				setPrices(allPrices);
				refetch();
			} catch (error) {
				console.error(error);
				return;
			}
		}
		setPrices(updatedPrices);
		setCriterion("");
		setPrice(0);
	};

	const handleDeletePrice = async (priceToDelete: Price) => {
		const updatedPrices = prices.filter(
			(p: Price) =>
				!(
					p.criterion === priceToDelete.criterion &&
					p.price === priceToDelete.price
				),
		);

		if (eventId) {
			try {
				await updatePricesMutation({ id: eventId, prices: updatedPrices });
				setPrices(updatedPrices);
				refetch();
			} catch (error) {
				console.error(error);
				return;
			}
		}
		setPrices(updatedPrices);
	};

	const handleSubmit = async (values: any, resetForm: () => void) => {
		handleAddPrice(eventId, values);
		resetForm();
	};

	return (
		<div className={styles.container}>
			<Formik
				initialValues={{ criterion: "", price: "" }}
				onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
				validationSchema={schema}
			>
				{formik => (
					<div className={styles.container}>
						<div className={styles.title}>
							<h2 className={styles.title__text}>Цены</h2>
							<div className={styles.buttonArt}>
								<ButtonArt
									icon={Plus}
									onClick={() => handleSubmit(formik.values, formik.resetForm)}
									type="submit"
								/>
							</div>
						</div>
						<div className={styles.inputRow}>
							<div className={styles.buttonRow}>
								<FormInput
									onChange={e => {
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
									onChange={e => {
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
			{data &&
				data.prices?.map((price: Price, index: number) => (
					<div className={styles.textAndDelete} key={index}>
						<span>
							{price.criterion}: {price.price} руб.
						</span>
						<div className={styles.delete}>
							<ButtonArt
								icon={Delete}
								onClick={() => {
									handleDeletePrice(price);
								}}
							/>
						</div>
					</div>
				))}
		</div>
	);
};
