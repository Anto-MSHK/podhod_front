import React, { useState } from "react";
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

interface LayoutFormI {
	id: string;
	modal: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export const LayoutForm: React.FC<LayoutFormI> = ({ id, modal }) => {
	const [addBlock, { data, isLoading, isSuccess, reset }] =
		useAddBlockMutation();
	const dispatch = useDispatch();
	const [type, setType] = useState("text");
	let [form, setForm]: any = useState(getConfigTextForm(id, addBlock));
	let curTypeText = "текст";

	switch (type) {
		case "text":
			curTypeText = "текст";
			break;
		case "img":
			curTypeText = "слайдер";
			break;
		default:
			<></>;
	}

	const btnData = [
		{
			name: "Текст",
			onClick: () => {
				setType("text");
				setForm(getConfigTextForm(id, addBlock));
			},
		},
		{
			name: "Картинка",
			onClick: () => {
				setType("img");
				setForm(getConfigImgForm(id, addBlock));
			},
		},
	];

	const toggleFunk = () => {
		reset();
		setType("text");
		setForm(getConfigTextForm(id, addBlock));
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
							Создать новый блок
						</ModalHeader>
						<ModalBody style={{ backgroundColor: "#1E1E1E ", color: "white" }}>
							{!isSuccess ? (
								<div style={{ backgroundColor: "#1E1E1E " }}>
									<CustomBtnGroup view="radio" data={btnData} />
								</div>
							) : (
								<InfoTag text={curTypeText} />
							)}
							{type === "text" ? (
								<TextForm />
							) : type === "img" ? (
								<ImgForm id={data ? data.id : undefined} />
							) : (
								<></>
							)}
						</ModalBody>

						<ModalFooter style={{ backgroundColor: "#1E1E1E", color: "white" }}>
							{isLoading && <Spinner />}
							{!isSuccess && type !== "img" && (
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
