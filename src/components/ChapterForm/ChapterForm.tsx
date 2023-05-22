import * as React from "react";
import styles from "./ChapterForm.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { FormInput } from "../Form/FormInput";
import {
	AddChapterReqT,
	UpdateChapterReqT,
	useAddChapterMutation,
	useUpdateChapterMutation,
} from "../../app/services/ChapterApi";

interface ChapterFormConfigT {
	title: string;
	description: string;
}
interface ChapterFormT {
	defaultData?: {
		title: string;
		description: string;
	};
	eventId: string;
	showPieceId: string;
	chapterId?: string;
	toggleChapter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	isEdit?: boolean;
}
interface IChapterReq extends AddChapterReqT, UpdateChapterReqT {}

export const ChapterForm: React.FC<ChapterFormT> = ({
	defaultData,
	showPieceId,
	eventId,
	toggleChapter,
	isEdit,
	chapterId,
}) => {
	const [addChapter] = useAddChapterMutation();
	const [updateChapter] = useUpdateChapterMutation();

	const handleSumbitChapter = async (chapter: IChapterReq) => {
		try {
			if (isEdit) {
				await updateChapter(chapter).unwrap;
			} else await addChapter(chapter).unwrap;
		} catch (error) {}
	};

	const formConfig: FormikConfig<ChapterFormConfigT> = {
		initialValues: {
			title: defaultData?.title || "",
			description: defaultData?.description || "",
		},
		onSubmit: async (values, form) => {
			let chapter: IChapterReq = {
				body: {
					title: values.title,
					description: values.description,
				},
				eventId: eventId,
				showpieceId: showPieceId,
				chapterId: chapterId || "",
			};
			await handleSumbitChapter(chapter);
		},
	};
	const schemaConfig: Yup.ObjectShape = {
		title: Yup.string().required("Обязательное поле!"),
		description: Yup.string().required("Обязательное поле!"),
	};

	return (
		<div className={styles.chapter_form_wrapper}>
			<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
				{formik => (
					<div className={styles.fillForm_container}>
						<div className={styles.asd}>
							<h2>{isEdit ? "Редактирование раздела" : "Создание раздела"}</h2>
						</div>
						<div className={styles.form}>
							<div className={styles.form_info}>
								<FormInput name="title" label="Название:" />
								<FormInput name="description" label="Описание:" />
							</div>
						</div>
						<div
							style={{ display: "flex", gap: 15, justifyContent: "flex-end" }}
						>
							<CustomBtn type="submit" onClick={toggleChapter}>
								{isEdit ? "Сохранить" : "Создать"}
							</CustomBtn>
							<CustomBtn onClick={toggleChapter}>Закрыть</CustomBtn>
						</div>
					</div>
				)}
			</FormContainer>
		</div>
	);
};
