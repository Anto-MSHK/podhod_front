import { useFormik, FormikConfig } from "formik";
import React, { FC } from "react";
import { Form as FormDesign } from "reactstrap";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import * as Yup from "yup";
import { Formik, FormikProps, Form } from "formik";

interface FormContainerI {
  children: JSX.Element;
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
      {(formik: FormikProps<any>) => (
          <Form  >
            {children}
          </Form>
      )}
    </Formik>
  );
};
