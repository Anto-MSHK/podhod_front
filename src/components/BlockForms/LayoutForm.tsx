import React, { useEffect, useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Spinner,
} from "reactstrap";

import { FormContainer } from "../Form/Form";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { FormInput } from "../Form/FormInput";
import styles from "./LayoutForm.module.css";
import { FormikConfig } from "formik";
import {
	chaptersApi,
	useAddBlockMutation,
	useUpdateBlockMutation,
} from "../../app/services/ChapterApi";
import { CustomBtnGroup } from "../CustomBtnGroup/CustomBtnGroup";
import { group } from "console";
import {
	TextBlockFormType,
	TextForm,
	getConfigTextForm,
} from "./TextForm/TextForm";
import { ImgForm, getConfigImgForm } from "./ImgForm/ImgForm";
import { useDispatch } from "react-redux";
import { deleteImgInImgBlock } from "../../app/Slices/imagesUploadSlice";
import { InfoTag } from "../InfoTag/InfoTag";
import { ImgBlockT, TextBlockT } from "../../app/Types/ChapterT";

export interface BlockDefaultData {
	title: string;
	data: TextBlockT | ImgBlockT;
}

enum BlockTypeEnum {
	"text" = "текст",
	"img" = "слайдер",
}

interface LayoutFormI {
	chapterId: string;
	modal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
	defaultData?: BlockDefaultData;
	blockId?: string;
	isEdit?: boolean;
	blockType?: "text" | "img";
}

export const LayoutForm: React.FC<LayoutFormI> = ({
	chapterId,
	modal,
	isEdit,
	defaultData,
	blockId,
	blockType,
}) => {
	const [addBlock, { data, isLoading, isSuccess, reset }] =
		useAddBlockMutation();
	const [updateBlock] = useUpdateBlockMutation();
	const dispatch = useDispatch();
	const [type, setType] = useState<{
		value: string;
		label: string;
	}>({ value: "text", label: "текст" });

	const handleBlockReq = isEdit ? updateBlock : addBlock;

	let [form, setForm]: any = useState(
		getConfigTextForm(handleBlockReq, chapterId, blockId || "", defaultData),
	);

	useEffect(() => {
		let type = blockType
			? {
					value: blockType,
					label: BlockTypeEnum[blockType],
			  }
			: {
					value: "text",
					label: "текст",
			  };
		setType(type);
	}, [blockType]);

	useEffect(() => {
		let form =
			type.value === "text"
				? getConfigTextForm(
						handleBlockReq,
						chapterId,
						blockId || "",
						defaultData,
				  )
				: getConfigImgForm(
						handleBlockReq,
						chapterId,
						blockId || "",
						defaultData,
				  );

		setForm(form);
	}, [type]);

	const defaultBtnData = [
		{
			name: "Текст",
			onClick: () => {
				setType({ value: "text", label: "текст" });
				setForm(
					getConfigTextForm(
						handleBlockReq,
						chapterId,
						blockId || "",
						defaultData,
					),
				);
			},
		},
		{
			name: "Картинка",
			onClick: () => {
				setType({ value: "img", label: "слайдер" });
				setForm(
					getConfigImgForm(
						handleBlockReq,
						chapterId,
						blockId || "",
						defaultData,
					),
				);
			},
		},
	];

	const toggleFunk = () => {
		reset();
		setType({
			value: blockType || "text",
			label: blockType ? BlockTypeEnum[blockType] : "текст",
		});
		setForm(
			getConfigTextForm(handleBlockReq, chapterId, blockId || "", defaultData),
		);
		modal[1](prev => !prev);
		dispatch(chaptersApi.util.invalidateTags(["Chapters"]));
		dispatch(deleteImgInImgBlock());
	};
	return (
		<Modal
			isOpen={modal[0]}
			toggle={() => {
				toggleFunk();
			}}
			size={"xl"}
			contentClassName={styles.modalWrapper}
			style={{
				backgroundColor: "#1E1E1E",
				color: "white",
				borderRadius: 15,
				marginTop: "10%",
			}}
			backdropClassName={styles.modalModal}
		>
			<FormContainer
				schemaConfig={form.schemaConfig}
				formConfig={form.formConfig}
			>
				{formik => (
					<div>
						<ModalHeader style={{ backgroundColor: "#1E1E1E" }}>
							{isEdit ? "Редактирование блока" : "Создать новый блок"}
						</ModalHeader>
						<ModalBody style={{ backgroundColor: "#1E1E1E ", color: "white" }}>
							{!isSuccess && !isEdit ? (
								<div style={{ backgroundColor: "#1E1E1E " }}>
									<CustomBtnGroup view="radio" data={defaultBtnData} />
								</div>
							) : (
								<InfoTag text={type.label} />
							)}
							{type.value === "text" ? (
								<TextForm />
							) : type.value === "img" ? (
								<ImgForm id={data ? data.id : undefined} />
							) : (
								<></>
							)}
						</ModalBody>

						<ModalFooter style={{ backgroundColor: "#1E1E1E", color: "white" }}>
							{isLoading && <Spinner />}
							{!isSuccess && type.value !== "img" && (
								<CustomBtn color="primary" type="submit">
									Сохранить
								</CustomBtn>
							)}
							<CustomBtn
								onClick={() => {
									toggleFunk();
								}}
							>
								Закрыть
							</CustomBtn>
						</ModalFooter>
					</div>
				)}
			</FormContainer>
		</Modal>
	);
};
