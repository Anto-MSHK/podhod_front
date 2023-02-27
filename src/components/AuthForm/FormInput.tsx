import React, { FC, ChangeEvent } from "react";
import {
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputProps,
} from "reactstrap";
import styles from "./AuthForm.module.css";
import { Field } from "formik";

interface FormInputI extends InputProps {
  label?: string;
  help?: string;
  name: string;
  form?: any;
}

export const CustomInput: FC<FormInputI> = ({ field, form }) => {
  return (
    <div>
      <Input
        {...field}
        valid={
          form.touched[`${field.name}`] &&
          form.errors[`${field.name}`] === undefined
        }
        invalid={
          form.touched[`${field.name}`] &&
          form.errors[`${field.name}`] !== undefined
        }
        className={styles.AuthInputElements}
      />
      <FormFeedback invalid tag="h3">
        {form.touched[`${field.name}`] ? form.errors[`${field.name}`] : ""}
      </FormFeedback>
    </div>
  );
};

export const FormInput: FC<FormInputI> = ({ name, label, help }) => {
  return (
    <FormGroup>
      <h3>{label}</h3>
      <Field name={name} component={CustomInput}></Field>
      <FormText tag={"p"}>{help}</FormText>
    </FormGroup>
  );
};
