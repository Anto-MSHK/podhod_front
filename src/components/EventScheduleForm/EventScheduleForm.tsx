import React, { useState } from "react";
import { CustomInput, FormInput } from "../Form/FormInput";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { FormContainer } from "../Form/Form";
import { FieldArray, FormikConfig } from "formik";
import * as Yup from "yup";
import { InputType } from "reactstrap/types/lib/Input";
import styles from "./EventScheduleForm.module.css";
import { useParams } from "react-router-dom";
import {
	useUpdateEventCalendarMutation,
	useUpdateEventTimesMutation,
} from "../../app/services/EventsApi";
import { EventTimeT, EventWeekDayT } from "../../app/Types/EventsT";
import removeIcon from '../../assets/icons/CrossInCircle.svg'

type FormInputDataT = {
	label: string;
	type: InputType;
	children?: JSX.Element | JSX.Element[];
};
type EventScheduleFormProps = {
	defaultData?: EventTimeT;
};

interface formType extends EventTimeT {
	applyToAllDate: {
		applyToAll: boolean;
		from: string;
		to: string;
		isWeekend: boolean;
	};
}

type DaysOfWeekT = {
	monday: EventWeekDayT;
	tuesday: EventWeekDayT;
	wednesday: EventWeekDayT;
	thursday: EventWeekDayT;
	friday: EventWeekDayT;
	saturday: EventWeekDayT;
	sunday: EventWeekDayT;
};

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
	sunday: {
		label: "Воскресенье",
		type: "time",
	},
};
const schemaConfig: Yup.ObjectShape = {
	days: Yup.object().required(),
	startDate: Yup.date().required(),
	endDate: Yup.date().required(),
};

export const EventScheduleForm: React.FC<EventScheduleFormProps> = ({
	defaultData,
}) => {
	const { id } = useParams();
	const [updateEventCalendar, { isError: isErrorUpdate }] =
		useUpdateEventCalendarMutation();
	const [updateEventTimes] = useUpdateEventTimesMutation();

	const checkApplyToAll = (days: DaysOfWeekT): boolean => {
		const fromValues: string[] = [];
		const toValues: string[] = [];
		const isWeekendArray: boolean[] = [];

		Object.entries(days).forEach(([_day, dayData]) => {
			fromValues.push(dayData.from);
			toValues.push(dayData.to);
			isWeekendArray.push(dayData.isWeekend);
		});

		const allFromEqual = fromValues.every((val) => val === fromValues[0]);
		const allToEndEqual = toValues.every((val) => val === toValues[0]);
		const noWeekendDays = isWeekendArray.every((val) => !val);

		return allFromEqual && allToEndEqual && noWeekendDays;
	};



	const defaultDays: DaysOfWeekT = defaultData?.days || {
		friday: {} as EventWeekDayT,
		monday: {} as EventWeekDayT,
		saturday: {} as EventWeekDayT,
		sunday: {} as EventWeekDayT,
		thursday: {} as EventWeekDayT,
		tuesday: {} as EventWeekDayT,
		wednesday: {} as EventWeekDayT,
	};

	const applyToAll: boolean = checkApplyToAll(defaultDays);


	const formConfig: FormikConfig<formType> = {
		initialValues: {
			days: defaultDays,
			startDate: defaultData?.startDate || "",
			endDate: defaultData?.endDate || "",
			nonWorkingDays: defaultData?.nonWorkingDays || [],
			applyToAllDate: {
				applyToAll: applyToAll,
				from: applyToAll ? defaultDays.monday.from : "",
				to: applyToAll ? defaultDays.monday.to : "",
				isWeekend: false,
			},
		},
		onSubmit: async (values, form) => {
			console.log(values);
			let calendar = {
				startDate: values.startDate,
				endDate: values.endDate,
				nonWorkingDays: values.nonWorkingDays,
			};

			try {
				const payload = await updateEventCalendar({
					id: id as string,
					body: calendar,
				}).unwrap();
				console.log("fulfilled", payload);
			} catch (error) {
				console.log("rejected", error);
			}

			try {
				let payload;
				if (values.applyToAllDate.applyToAll) {
					payload = await updateEventTimes({
						id: id as string,
						body: {
							applyToAll: values.applyToAllDate.applyToAll,
							dayOfWeek: "monday",
							from: values.applyToAllDate.from,
							to: values.applyToAllDate.to,
							isWeekend: values.applyToAllDate.isWeekend,
						},
					});
				} else {
					const daysWeek = Object.entries(values.days).map(([key, value]) => {
						return {
							dayOfWeek: key,
							...value,
							applyToAll: false,
						};
					});

					for (const day of daysWeek) {
						payload = await updateEventTimes({ id: id as string, body: day });
						console.log("fulfilled", payload);
					}
				}
			} catch (error) {
				console.log("rejected", error);
			}
		},
	};

	return (
		<div className={styles.form_wrapper}>
			<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
				{formik => (
					<div className={styles.content_container}>
						<div className={styles.weekDays_container}>
							<h2>Время работы:</h2>
							<div className={styles.applyToAllDate_container}>
								<div className={styles.applyAll_date_checkbox}>
									<FormInput name="applyToAllDate.applyToAll" type="checkbox" />
									<h3>Применить для всей недели</h3>
								</div>
								<div className={styles.applyToAll_date_inputs}>
									<FormInput
										name={`applyToAllDate.from`}
										type="time"
										help="Время начала работы мероприятия"
									/>
									<FormInput
										name={`applyToAllDate.to`}
										type="time"
										help="Время конца работы мероприятия"
									/>
								</div>
							</div>
							{!formik.values.applyToAllDate.applyToAll && (
								<div className={styles.weekDaysList}>
									{Object.entries(dictionary).map(([key, value], index) => (
										<div
											key={key}
											style={{
												display: "flex",
												alignItems: "center",
												gap: "1rem",
											}}
										>
											<h3 className={styles.title}>{value.label}</h3>

											<FormInput name={`days.${key}.from`} type={value.type} />
											<FormInput name={`days.${key}.to`} type={value.type} />
											<FormInput
												help="Выходной"
												name={`days.${key}.isWeekend`}
												type="checkbox"
											/>
										</div>
									))}
								</div>
							)}
						</div>

						<div className={styles.dates_container}>
							<h2>Даты мероприятия:</h2>
							<FormInput
								name={`startDate`}
								type="date"
								help="Дата начала мероприятия"
							/>
							<FormInput
								name={"endDate"}
								type="date"
								help="Дата конца мероприятия"
							/>
						</div>

						<div className={styles.nonWorkingDays_block}>
							<h2>Нерабочие дни:</h2>
							<FieldArray name="nonWorkingDays">
								{({ insert, remove, push }) => (
									<div className={styles.nonWorkingDays_container}>
										{formik.values.nonWorkingDays.map(
											(day: string, index: number) => (
												<div
													className={styles.nonWorkingDay_container}
													key={index + day}
												>
													<div className={styles.nonWorkingDay_input}>
														<FormInput
															name={`nonWorkingDays.${index}`}
															type="date"
														/>
													</div>

													<CustomBtn
														type="button"
														className={styles.remove_nonWorkingDay_btn}
														onClick={() => remove(index)}
														icon={removeIcon}
														iconWidth={25}
													/>
												</div>
											),
										)}
										<CustomBtn
											className={styles.add_nonWorkingDay_btn}
											type="button"
											onClick={() => push("")}
										>
											Добавить нерабочий день
										</CustomBtn>
									</div>
								)}
							</FieldArray>
						</div>
						<CustomBtn className={styles.submit_btn} type="submit">
							Сохранить
						</CustomBtn>
					</div>
				)}
			</FormContainer>
		</div>
	);
};
