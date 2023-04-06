import { useFormik, FormikConfig } from "formik";
import React, { FC } from "react";
import { Form as FormDesign } from "reactstrap";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import * as Yup from "yup";
import { Formik, FormikProps, Form } from "formik";

interface FormContainerI {
	children: (formik: FormikProps<any>) => JSX.Element;
	formConfig: FormikConfig<any>;
	schemaConfig: Yup.ObjectShape;
}
export const FormContainer: FC<FormContainerI> = ({
	children,
	schemaConfig,
	formConfig,
}) => {
	const schema = Yup.object().shape(schemaConfig);
	return (
		<Formik
			initialValues={formConfig.initialValues}
			validationSchema={schema}
			onSubmit={formConfig.onSubmit}
		>
			{(formik: FormikProps<any>) => <Form>{children(formik)}</Form>}
		</Formik>
	);
};
