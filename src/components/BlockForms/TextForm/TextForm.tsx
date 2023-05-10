import React, { FC } from "react";
import { FormInput } from "../../Form/FormInput";
import { FormikConfig } from "formik";
import { useAddBlockMutation } from "../../../app/services/ChapterApi";
import * as Yup from "yup";

export type TextBlockFormType = {
	title: string;
	description: string;
	type: string;
};

export const getConfigTextForm = (
	id: string,
	addBlock: (config: any) => void,
): {
	formConfig: FormikConfig<TextBlockFormType>;
	schemaConfig: Yup.ObjectShape;
} => {
	const schemaConfig: Yup.ObjectShape = {
		title: Yup.string().required("Обязательное поле!"),
	};

	return {
		formConfig: {
			initialValues: {
				title: "",
				description: "",
				type: "text",
			},
			onSubmit: (values, form) => {
				addBlock({
					chapterId: id,
					body: {
						title: values.title,
						type: "text",
						content: {
							description: values.description,
						},
					},
				});
			},
		},
		schemaConfig,
	};
};
interface ITextForm {}
export const TextForm: FC<ITextForm> = ({}) => {
	return (
		<div>
			<FormInput name="title" label="Название:" />
			<FormInput name="description" label="Описание:" />
		</div>
	);
};
