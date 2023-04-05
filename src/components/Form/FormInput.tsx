import React, { FC, ChangeEvent } from "react";
import {
	FormFeedback,
	FormGroup,
	FormText,
	Input,
	InputProps,
} from "reactstrap";
import styles from "./Form.module.css";
import {
	Field,
	FieldConfig,
	FieldProps,
	FieldValidator,
	FormikConfig,
	Formik,
	FormikTouched,
} from "formik";
import { InputType } from "reactstrap/types/lib/Input";
import { type } from "os";

interface CustomInputI extends InputProps {
	form: any;
	type?: InputType;
	disabled: boolean;
}
interface CustomFormInputI extends FieldConfig {
	label?: string;
	help?: string;
	name: string;
	type?: InputType;
	value?: any;
	disabled?: boolean;
}

export const CustomInput: FC<CustomInputI> = ({
	field,
	form,
	type,
	children,
	disabled,
}) => {
	return (
		<div>
			<Input
				disabled={disabled}
				type={type}
				{...field}
				valid={
					form.values[`${field.name}`] ||
					(form.touched[`${field.name}`] &&
						form.errors[`${field.name}`] === undefined)
				}
				invalid={
					form.touched[`${field.name}`] &&
					form.errors[`${field.name}`] !== undefined
				}
				className={styles.AuthInputElements}
			>
				{children ? children : undefined}
			</Input>
			<FormFeedback invalid="true" tag="h2">
				{form.touched[`${field.name}`] ? form.errors[`${field.name}`] : ""}
			</FormFeedback>
		</div>
	);
};

export const FormInput: FC<CustomFormInputI> = ({
	name,
	label,
	help,
	type,
	children,
	value,
	disabled,
}) => {
	return (
		<FormGroup>
			<h3>{label}</h3>
			<Field
				disabled={disabled}
				type={type}
				name={name}
				component={CustomInput}
				value={value}
			>
				{children ? children : null}
			</Field>

			<FormText tag={"p"}>{help}</FormText>
		</FormGroup>
	);
};
