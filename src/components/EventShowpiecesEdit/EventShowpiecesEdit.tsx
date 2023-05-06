import React, { useEffect, useState } from "react";
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
	Spinner,
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
import descIcon from "../../assets/icons/descIcon.svg";
import { CustomBtn } from "./../CustomBtn/CustomBtn";
import { ChapterForm } from "../ChapterForm/ChapterForm";
import { setSelectedExhibit } from "../../app/Slices/SelectedExhibitSlice";
import { CustomBtnGroup } from "../CustomBtnGroup/CustomBtnGroup";

interface formType {
	exhibitName: string;
	exhibitShort: string;
	exhibitDescription: string;
}

export const EventShowpiecesEdit = () => {
	const [modalChapter, setModalChapter] = useState(false);
	const toggleChapter = () => setModalChapter(!modalChapter);

	const { id: eventId } = useParams();
	const [modal, setModal] = useState(false);
	const [currentItem, setCurrenstItem] = useState("");
	const { data, isLoading } = useFetchExhibitsQuery(eventId);
	const [chapterConf, setChapterConf] = useState({
		eventId: eventId as string,
		showpieceId: data?.length ? data[0].id : "0",
	});
	const {
		data: showpiece,
		isLoading: isChaptersLoading,
		isFetching: isChaptersFetching,
	} = useFetchChaptersQuery(chapterConf);
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

		const selectedExhibit = data?.find((exhibit) => exhibit.id === e.key);
		dispatch(setSelectedExhibit(selectedExhibit || null));
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

	useEffect(() => {
		if (menuItems && menuItems?.length > 0) setCurrenstItem(menuItems[0].key);
		setChapterConf({
			eventId: eventId as string,
			showpieceId: data?.length ? data[0].id : "0",
		});
	}, [data]);

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

	const btnData = [
		{ name: "Текст", onClick: () =>  {} },
		{ name: "Картинка", onClick: () => {}},
		
	];


	const schemaConfig: Yup.ObjectShape = {
		exhibitName: Yup.string().required("Обязательное поле!"),
		exhibitShort: Yup.string().required("Обязательное поле!"),
		exhibitDescription: Yup.string().required("Обязательное поле!"),
	};

	return (
		<div className={styles.main_page_form_wrapper}>
			{showpiece ? (
				<div className={styles.main_form_wrapper} style={{ display: "flex" }}>
					<div style={{ maxWidth: 300 }}>
						<div className={styles.form_header}>
							<CustomInput placeholder={"Найти экспонат..."} />
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
					<div className={styles.form_divider} />
					<div style={{ width: "100%" }}>
						<div className={styles.form_header}>
							<h2 style={{ marginTop: -6, fontSize: 28 }}>
								{showpiece?.name}
								<p className="min" style={{ marginTop: -2, marginBottom: 0 }}>
									экспонат
								</p>
							</h2>
							<CustomBtn
								onClick={() => setModalChapter(true)}
								iconWidth={20}
								icon={plusIcon}
							>
								Добавить главу
							</CustomBtn>
						</div>
						<div className={styles.form_content}></div>
						<CustomCard
							className={`${styles.showpiece_list} ${styles["chapters"]}`}
							style={{ backgroundColor: "#363535", padding: "1rem" }}
						>
							{showpiece &&
							showpiece.chapters &&
							showpiece.chapters?.length > 0 ? (
								<ChapterList
									showpiece={showpiece}
									eventId={eventId as string}
								/>
							) : isChaptersFetching ? (
								<div className={styles.img}>
									<Spinner type="grow" className={styles.spinner} />
								</div>
							) : (
								<InfoMessage
									title="Создайте первую главу о вашем экспонате!"
									icon={descIcon}
									iconPosition="top"
									iconWidth={100}
									style={{ padding: 40 }}
								/>
							)}
						</CustomCard>
					</div>
					
					<Modal
						isOpen={modalChapter}
						toggle={toggleChapter}
						size={"xl"}
						contentClassName={styles.modalWrapper}
						className={styles.modal}
						backdropClassName={styles.modalModal}
					>
						{eventId && (
							<ChapterForm
								eventId={eventId}
								showPieceId={chapterConf.showpieceId}
							/>
						)}
					</Modal>
				</div>
			) : isChaptersLoading ? (
				<div className={styles.img}>
					<Spinner type="grow" className={styles.spinner} />
				</div>
			) : (
				<CustomBtn
					onClick={() => {
						setModal(true);
					}}
					icon={plusIcon}
					iconWidth={20}
					style={{ marginTop: 15 }}
				>
					Создайте первый экспонат
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
								<CustomBtn onClick={()=>{}} color="primary" type="submit">
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
