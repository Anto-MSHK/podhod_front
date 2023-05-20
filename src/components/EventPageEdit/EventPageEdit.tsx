import React, { useState } from "react";
import styles from "./EventPageEdit.module.css";
import { FormInput } from "../Form/FormInput";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useAppDispatch } from "../../app/hooks";
import deleteIcon from "../../assets/icons/CrossInCircle.svg";
import editIcon from '../../assets/icons/editIcon.svg'
import { useParams } from "react-router-dom";
import {
	useAddPageMutation,
	useDeletePageMutation,
	useFetchPageQuery,
	useUpdatePageMutation,
} from "../../app/services/EventPages.Api";
import {
	CreateExpoPagePayloadT,
	UpdateExpoPagePayloadT,
	EventPagesT,
} from "../../app/Types/EventPageT";
import { setPage } from "../../app/Slices/ExpoCreatePageSlice";
import { setSelectedPage } from "../../app/Slices/SelectedPageSlice";
import ImagesGallery from "../ImagesGallery/ImagesGallery";

interface formType {
	pageName: string;
	pageDescription: string;
	visibleLogo: boolean;
}

export const EventPageEdit = () => {
	const { id: eventId } = useParams();
	const [modal, setModal] = useState(false);
	const { data, isLoading } = useFetchPageQuery(eventId);
	const [addPage] = useAddPageMutation();
	const [updatePage] = useUpdatePageMutation();
	const [deletePage] = useDeletePageMutation();
	const [editingPage, setEditingPage] = useState<any>(null);
	const [selectedPageId, setSelectedPageId] = useState<number | null>(null);
	const dispatch = useAppDispatch();

	const toggle = () => setModal(!modal);

	const handleSelectPage = (page: EventPagesT) => {
		dispatch(setSelectedPage(page));
		setSelectedPageId(page.id);
	}

	const handleEditPage = (page: EventPagesT) => {
		setEditingPage(page);
		toggle();
	};

	const handleAddPage = (values: formType) => {
		console.log("Submitting form...", values);
		let page: CreateExpoPagePayloadT = {
			date: new Date().toISOString(),
			name: values.pageName,
			description: values.pageDescription,
			visibleLogo: values.visibleLogo,
		};
		dispatch(setPage(values));
		addPage({ eventId: eventId as string, body: page }).unwrap();
		toggle();
	};

	const handleUpdatePage = (values: formType) => {
		console.log("Updating exhibit...", values);
		if (editingPage !== null) {
			const page: UpdateExpoPagePayloadT = {
				name: values.pageName,
				description: values.pageDescription,
				visibleLogo: values.visibleLogo,
			};
			updatePage({
				body: page,
				eventId: eventId as string,
				id: editingPage.id,
			}).unwrap();
			toggle();
		}
	};

	const handleDeletePage = async (id: any) => {
		await deletePage({ eventId: eventId as string, id }).unwrap();
	};

	const formConfig: FormikConfig<formType> = {
		initialValues: {
			pageName:
				editingPage && editingPage.id === null
					? ""
					: editingPage && editingPage.name,
			pageDescription:
				editingPage && editingPage.id === null
					? ""
					: editingPage && editingPage.description,
			visibleLogo: editingPage === null ? true : editingPage.visibleLogo,
		},
		onSubmit: (values, form) => {
			if (!editingPage) {
				handleAddPage(values);
			} else {
				handleUpdatePage(values);
			}
		},
	};

	const sortedData = data?.slice().sort((a, b) => {
		return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
	});


	const schemaConfig: Yup.ObjectShape = {
		pageName: Yup.string().required("Обязательное поле!"),
		pageDescription: Yup.string(),
		visibleLogo: Yup.boolean(),
	};


	return (
		<div className={styles.main_page_form_wrapper}>
			<div>
				<CustomBtn
					onClick={() => {
						setModal(true);
					}}
				>
					Создать страницу
				</CustomBtn>
			</div>
			<div>
				{!isLoading &&
					sortedData &&
					sortedData.map((el: EventPagesT, index) => {
						const isActivePage = selectedPageId === el.id; // Check if current page is the selected page
						const updatedName = el.name === "#main-page" ? { ...el, name: "Главная страница" } : el;
						return (
							<div key={el.id} className={styles.mainCreatePageWrapper}>
								<div
									className={isActivePage ? styles.pagesListWrapperActive : styles.pagesListWrapper}
									onClick={() => handleSelectPage(updatedName)}
								>
									<div>{updatedName.name}</div>
								</div>
								<div
									className={styles.pagesEditWrapper}
									onClick={() => {
										handleEditPage(updatedName);
									}}
								>
									<img src={editIcon} style={{ width: "21px", height: "21px" }} />
								</div>
								<div
									className={styles.pagesDeleteWrapper}
									onClick={() => {
										handleDeletePage(updatedName.id);
									}}
								>
									<img src={deleteIcon} />
								</div>
							</div>
						);
					})}
			</div>
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
					setEditingPage(null);
				}}
			>
				<FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
					{formik => (
						<>
							<ModalHeader
								style={{ backgroundColor: "#1E1E1E", color: "white" }}
							>
								{editingPage === null
									? "Создание страницы "
									: "Редактирование страницы "}
							</ModalHeader>
							<ModalBody
								style={{ backgroundColor: "#1E1E1E ", color: "white" }}
							>
								<div>
									<div>
										<FormInput
											name="pageName"
											label="Название:"
										/>
										<FormInput
											name="pageDescription"
											label="Полное описание:"
											type={"textarea"}
										/>
										<FormInput
											name="visibleLogo"
											label="Показывать логотип"
											type="checkbox"
										/>
									</div>
									{editingPage !== null ?
										(
											<ImagesGallery
												imgField="galleryImgBlock"
												path={`/img/to/page/${editingPage?.id}`}
											/>
										) :
										(
											<h6 style={{color: "gray"}}>После создания вам будет доступна загрузка фотографий</h6>
										)
									}
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
