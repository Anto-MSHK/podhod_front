import React, { FC } from "react";
import { FormInput } from "../../Form/FormInput";
import { FormikConfig } from "formik";
import * as Yup from "yup";

export type TextBlockFormType = {
	title: string;
	description: string;
	type: string;
};

export const getConfigTextForm = (
	handleReqBlock: (config: any) => void,
	chapterId: string,
	blockId?: string,
	initialValues?: any,
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
				title: initialValues?.title || '',
				description: initialValues?.data['description'] || '',
				type: "text",
			},
			onSubmit: async (values, form) => {
				let blockConf = {
					chapterId,
					blockId,
					body: {
						title: values.title,
						type: "text",
						content: {
							description: values.description,
						},
					},
				};
				try {
					await handleReqBlock(blockConf);
				} catch (error) {}
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
			<FormInput type="textarea" name="description" label="Описание:" />
		</div>
	);
};
