import React, { FC } from "react";
import { FormInput } from "../../Form/FormInput";
import { FormikConfig } from "formik";
import { useAddBlockMutation } from "../../../app/services/ChapterApi";
import * as Yup from "yup";
import ImagesGallery from "../../ImagesGallery/ImagesGallery";
import { CustomBtn } from "../../CustomBtn/CustomBtn";

export type ImgBlockFormType = {
	title: string;
	type: string;
};

export const getConfigImgForm = (
	handleBlockReq: (config: any) => void,
	chapterId: string,
	blockId?: string,
	initialValues?: any,
	isEdit?: boolean,
): {
	formConfig: FormikConfig<ImgBlockFormType>;
	schemaConfig: Yup.ObjectShape;
} => {
	const schemaConfig: Yup.ObjectShape = {
		title: Yup.string().required("Обязательное поле!"),
	};

	return {
		formConfig: {
			initialValues: {
				title: initialValues ? initialValues.title : "",
				type: "img",
			},
			onSubmit: async values => {
				let body = isEdit
					? {
							chapterId,
							blockId,
							body: {
								title: values.title,
								type: "img",
							},
					  }
					: {
							chapterId,
							blockId,
							body: {
								title: values.title,
								type: "img",
								content: {},
							},
					  };
				await handleBlockReq(body);
			},
		},
		schemaConfig,
	};
};
interface IImgForm {
	id: string;
	isEdit?: boolean;
}
export const ImgForm: FC<IImgForm> = ({ id, isEdit }) => {
	return (
		<div>
			<FormInput name="title" label="Название:" />
			{!id && (
				<CustomBtn
					color="primary"
					type="submit"
					// onClick={() => isNewModal[1](false)}
				>
					Сохранить и добавить картинки
				</CustomBtn>
			)}
			{(id || isEdit) && (
				<div>
					<h3>Картинки:</h3>
					<ImagesGallery
						imgField="galleryImgBlock"
						path={`/img/to/img-block/${id}`}
					/>
				</div>
			)}
		</div>
	);
};
