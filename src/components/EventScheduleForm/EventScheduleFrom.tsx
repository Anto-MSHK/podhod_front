import React, { useState } from "react";
import { CustomInput, FormInput } from "../Form/FormInput";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { FormContainer } from "../Form/Form";
import { FieldArray, FormikConfig } from "formik";
import * as Yup from "yup";
import { InputType } from "reactstrap/types/lib/Input";
import styles from "./EventScheduleForm.module.css";

type FormInputDataT = {
	label: string;
	type: InputType;
	children?: JSX.Element | JSX.Element[];
};
type Props = {};
interface formType {
	monday: {
		from: string;
		to: string;
	};
	tuesday: {
		from: string;
		to: string;
	};
	thursday: {
		from: string;
		to: string;
	};
	friday: {
		from: string;
		to: string;
	};
	saturday: {
		from: string;
		to: string;
	};
	wednesday: {
		from: string;
		to: string;
	};
	date: {
		from: string;
		to: string;
	};
	nonWorkingDays: string[];
	checked: string[];
}
/* 
Monday ['манди]: понедельник
Tuesday ['тйу:зди]: вторник
Wednesday ['уэнзди]: среда
Thursday ['сэ:зди]: четверг
Friday ['фрайди]: пятница
Saturday ['сэтэди]: суббота
Sunday ['санди]: воскресенье */

const dictionary: Record<string, FormInputDataT> = {
	monday: {
		label: "Понедельник",
		type: "time",
	},
	tuesday: {
		label: "Вторник",
		type: "time",
	},
	wednesday: {
		label: "Среда",
		type: "time",
	},
	thursday: {
		label: "Четверг",
		type: "time",
	},
	friday: {
		label: "Пятница",
		type: "time",
	},
	saturday: {
		label: "Суббота",
		type: "time",
	},
};
const schemaConfig: Yup.ObjectShape = {
	/* monday: Yup.string(),
	tuesday: Yup.string(),
	wednesday: Yup.string(),
	thursday: Yup.string(),
    friday: Yup.string(), */
	date: Yup.object().required(),
};

export const EventScheduleFrom: React.FC<Props> = (props: Props) => {
	const formConfig: FormikConfig<formType> = {
		initialValues: {
			friday: {
				from: "",
				to: "",
			},
			monday: {
				from: "",
				to: "",
			},
			saturday: {
				from: "",
				to: "",
			},
			wednesday: {
				from: "",
				to: "",
			},
			thursday: {
				from: "",
				to: "",
			},
			tuesday: {
				from: "",
				to: "",
			},
			date: {
				from: "",
				to: "",
			},
			checked: [],
			nonWorkingDays: [],
		},
		onSubmit: async (values, form) => {
			console.log(values);
		},
	};

	return (
		<div className={styles.form_wrapper}>
			<h2>Время работы:</h2>
			<div className={styles.apply_checkbox_container}>
				<p>Применить для всех?</p>
				<CustomInput type="checkbox" />
			</div>
			<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
				{formik => (
					<div className={styles.content_container}>
						{Object.entries(dictionary).map(([key, value], index) => (
							<div
								key={key}
								style={{ display: "flex", alignItems: "center", gap: "1rem" }}
							>
								<h3 className={styles.title}>{value.label}</h3>

								<FormInput name={`${key}.from`} type={value.type} />
								<FormInput name={`${key}.to`} type={value.type} />
								<FormInput
									help="Выходной?"
									name="checked"
									type="checkbox"
									value={key}
								/>
							</div>
						))}

						<h2>Даты:</h2>
						<div>
							<FormInput name={`date.from`} type="date" />
							<FormInput name={"date.to"} type="date" />
						</div>

						<h2>Не рабочие дни:</h2>
						<div>
							<FieldArray name="nonWorkingDays">
								{({ insert, remove, push }) => (
									<div className={styles.nonWorkingDays_container}>
										<CustomBtn
											type="button"
											onClick={() => push('')}
										>
											Добавить нерабочий день
										</CustomBtn>
										{formik.values.nonWorkingDays.map(
											(day: string, index: number) => (
												<div className={styles.nonWorkingDay_container}  key={index}>
													<div >
														<FormInput name={`nonWorkingDays.${index}`} type="date" />
													</div>

													<div >
														<CustomBtn
															type="button"
															className={styles.remove_nonWorkingDay_btn}
															onClick={() => remove(index)}
														>
															X
														</CustomBtn>
													</div>
												</div>
											),
										)}
									</div>
								)}
							</FieldArray>
						</div>
						<CustomBtn type="submit">Сохранить</CustomBtn>
					</div>
				)}
			</FormContainer>
		</div>
	);
};
