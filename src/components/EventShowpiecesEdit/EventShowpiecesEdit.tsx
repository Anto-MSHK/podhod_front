import React, { useState } from "react";
import styles from "./EventShowpiecesEdit.module.css";
import { CustomInput, FormInput } from "../Form/FormInput";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ListGroup,
	DropdownItemProps,
} from "reactstrap";

import {
	useFetchExhibitsQuery,
	useAddExhibitMutation,
	useDeleteExhibitMutation,
	useUpdateExhibitMutation,
} from "../../app/services/ExhibitsApi";
import { useAppDispatch } from "../../app/hooks";
import { setExhibit } from "../../app/Slices/ExhibitCreateSlice";
import {
	CreateExhibitPayloadT,
	UpdateExhibitPayloadT,
} from "../../app/Types/ExhibitsT";
import { useParams } from "react-router-dom";
import { exhibitsT } from "../../app/Types/ExhibitsT";
import { useFetchChaptersQuery } from "../../app/services/ChapterApi";
import { ChapterList } from "../ChapterList/ChapterList";
import { InfoMessage } from "../InfoMessage/InfoMessage";
import CustomCard from "../CustomCard/CustomCard";
import {
	CustomListItemI,
	ListDropDownItemsI,
} from "../CustomListItem/CustomListItem";
import CustomListMenu, {
	CustomMenuItemT,
	MenuClickInfo,
} from "../CustomListMenu/CustomListMenu";
import plusIcon from "../../assets/icons/plusIcon.svg";
import { CustomBtn } from "./../CustomBtn/CustomBtn";

interface formType {
	exhibitName: string;
	exhibitShort: string;
	exhibitDescription: string;
}

export const EventShowpiecesEdit = () => {
	const { id: eventId } = useParams();
	const [modal, setModal] = useState(false);
	const [currentItem, setCurrenstItem] = useState("");
	const { data, isLoading } = useFetchExhibitsQuery(eventId);
	const [chapterConf, setChapterConf] = useState({
		eventId: eventId as string,
		showpieceId: data?.length ? data[0].id : "0",
	});
	const { data: showpiece, isLoading: isChaptersLoading } =
		useFetchChaptersQuery(chapterConf);
	const [addExhibit] = useAddExhibitMutation();
	const [updateExhibit] = useUpdateExhibitMutation();
	const [deleteExhibit] = useDeleteExhibitMutation();
	const [editingExhibit, setEditingExhibit] = useState<any>(null);
	const dispatch = useAppDispatch();

	const toggle = () => setModal(!modal);

	const handleEditExhibit = (exhibit: exhibitsT) => {
		console.log(exhibit);
		setEditingExhibit(exhibit);
		toggle();
	};

	const сhangeShowPiece = (showPieceId: string) => {
		setChapterConf({
			eventId: eventId as string,
			showpieceId: showPieceId,
		});
	};
	const handleMenuSelect = (e: MenuClickInfo) => {
		setCurrenstItem(e.key);
		сhangeShowPiece(e.key);
	};

	const handleAddExhibit = (values: formType) => {
		console.log("Submitting form...", values);
		let exhibit: CreateExhibitPayloadT = {
			date: new Date().toISOString(),
			name: values.exhibitName,
			short: values.exhibitShort,
			description: values.exhibitDescription,
		};
		dispatch(setExhibit(values));
		addExhibit({ body: exhibit, eventId: eventId as string });
		toggle();
	};

	const handleUpdateExhibit = (values: formType) => {
		console.log("Updating exhibit...", values);
		if (editingExhibit !== null) {
			let exhibit: UpdateExhibitPayloadT = {
				name: values.exhibitName,
				description: values.exhibitDescription,
				short: values.exhibitShort,
			};
			updateExhibit({
				id: editingExhibit.id,
				body: exhibit,
				eventId: eventId as string,
			});
			toggle();
		}
	};

	const handleDeleteExhibit = async (id: string) => {
		console.log("delete...");
		await deleteExhibit({ id, eventId: eventId as string }).unwrap();
	};

	function getItem(
		title: string,
		key: React.Key,
		id: string,
		subTitle?: string,
		dropdownItems?: ListDropDownItemsI[],
	): CustomMenuItemT {
		return {
			title,
			key,
			id,
			subTitle,
			dropdownItems,
		} as CustomMenuItemT;
	}

	const menuItems: CustomListItemI[] | undefined = data?.map((item, index) => {
		const dropDownItems: ListDropDownItemsI[] = [
			{
				text: "Редактировать",
				onClick: () => handleEditExhibit(item),
			},
			{
				text: "Удалить",
				onClick: () => handleDeleteExhibit(item.id),
			},
		];
		return getItem(item.name, item.id, item.id, item.short, dropDownItems);
	});

	const formConfig: FormikConfig<formType> = {
		initialValues: {
			exhibitName:
				editingExhibit && editingExhibit.id === null
					? ""
					: editingExhibit && editingExhibit.name,
			exhibitShort:
				editingExhibit && editingExhibit.id === null
					? ""
					: editingExhibit && editingExhibit.short,
			exhibitDescription:
				editingExhibit && editingExhibit.id === null
					? ""
					: editingExhibit && editingExhibit.description,
		},
		onSubmit: (values, form) => {
			if (editingExhibit === null) {
				handleAddExhibit(values);
			} else {
				handleUpdateExhibit(values);
			}
		},
	};

	const schemaConfig: Yup.ObjectShape = {
		exhibitName: Yup.string().required("Обязательное поле!"),
		exhibitShort: Yup.string().required("Обязательное поле!"),
		exhibitDescription: Yup.string().required("Обязательное поле!"),
	};

	return (
		<div className={styles.main_page_form_wrapper}>
			{showpiece ? (
				<div className={styles.main_form_wrapper} style={{ display: "flex" }}>
					<div>
						<div className={styles.form_header}>
							<CustomInput placeholder="Найти экспонат..." />
						</div>
						<CustomListMenu
							className={styles.showpiece_list}
							onClick={handleMenuSelect}
							selectedKey={currentItem}
							items={menuItems?.length ? menuItems : []}
						/>
						<CustomBtn
							onClick={() => {
								setModal(true);
							}}
							icon={plusIcon}
							iconWidth={20}
							style={{ marginTop: 15 }}
						>
							Новый экспонат
						</CustomBtn>
					</div>
					<div
						style={{
							backgroundColor: "white",
							top: 0,
							bottom: 0,
							padding: 1,
							margin: "0 15px",
							borderRadius: 10,
						}}
					/>
					<div style={{ width: "100%" }}>
						<div className={styles.form_header}>
							<h2 style={{ margin: 0 }}>
								{showpiece?.name}
								<p className="min" style={{ marginTop: -5 }}>
									экспонат
								</p>
							</h2>
							<CustomBtn
								onClick={() => {
									setModal(true);
								}}
								iconWidth={20}
								icon={plusIcon}
							>
								Добавить главу
							</CustomBtn>
						</div>
						<div className={styles.form_content}></div>
						<CustomCard
							className={`${styles.showpiece_list} ${styles["chapters"]}`}
						>
							<ChapterList showpiece={showpiece} eventId={eventId as string} />
						</CustomCard>
					</div>
				</div>
			) : (
				<CustomBtn
					onClick={() => {
						setModal(true);
					}}
				>
					Создать экспонат
				</CustomBtn>
			)}
			<Modal
				isOpen={modal}
				toggle={toggle}
				size={"xl"}
				contentClassName={styles.modalWrapper}
				style={{
					backgroundColor: "#1E1E1E",
					color: "white",
					borderRadius: 15,
					marginTop: "10%",
				}}
				backdropClassName={styles.modalModal}
				onClosed={() => {
					setEditingExhibit(null);
				}}
			>
				<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
					{formik => (
						<>
							<ModalHeader
								style={{ backgroundColor: "#1E1E1E", color: "white" }}
							>
								{editingExhibit === null
									? "Создание экспоната"
									: "Редактирование экспоната"}
							</ModalHeader>
							<ModalBody
								style={{ backgroundColor: "#1E1E1E ", color: "white" }}
							>
								<div>
									<div>
										<FormInput name="exhibitName" label="Название:" />
										<FormInput name="exhibitShort" label="Короткое описание:" />
										<FormInput
											name="exhibitDescription"
											label="Полное описание:"
											type={"textarea"}
										/>
									</div>
								</div>
							</ModalBody>
							<ModalFooter
								style={{ backgroundColor: "#1E1E1E", color: "white" }}
							>
								<CustomBtn color="primary" type="submit">
									Сохранить
								</CustomBtn>
								<CustomBtn onClick={toggle}>Отменить</CustomBtn>
							</ModalFooter>
						</>
					)}
				</FormContainer>
			</Modal>
		</div>
	);
};
