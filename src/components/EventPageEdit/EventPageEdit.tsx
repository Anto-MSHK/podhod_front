import React, { useEffect, useState } from "react";
import styles from "./EventPageEdit.module.css";
import { FormInput } from "../Form/FormInput";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import { imageType, replaceImgInPage } from "../../app/Slices/imagesUploadSlice";
import { API_URL } from "../../app/http";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

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
	const replaceImgs = useAppSelector((state) => state.images.galleryPageImgs);

	const toggle = () => setModal(!modal);

	const handleSelectPage = (page: EventPagesT) => {
		dispatch(setSelectedPage(page));
		setSelectedPageId(page.id);
	};

	const handleEditPage = async (page: EventPagesT) => {
		dispatch(setSelectedPage(page))
		await setEditingPage(page);
		await setSelectedPageId(page.id);
		await toggle();
	};

	const handleAddPage = (values: formType) => {
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
			setSelectedPageId(null)
		}
	};

	useEffect(() => {
		if (data) {
			let page = data.find((page) => page.id === selectedPageId);
			if (page && page.imgs) {
				let imgs: imageType[] = page.imgs.map((img) => {
					return {
						...img,
						path: API_URL + "/" + img.path,
						eventId: Number(eventId),
					};
				});
				dispatch(replaceImgInPage(imgs));
			}
		}
	}, [data, eventId, selectedPageId]);

	const handleDeletePage = async (id: any) => {
		try {
			await deletePage({ eventId: eventId as string, id }).unwrap();
		}
		catch {
			console.log(error)
			alert('Произошла ошибка.' + '\n' +
				'Возможно, вы пытаетесь удалить главную страницу.' + '\n' + 'Для удаления её необходимо отредактировать хотя бы один раз.')
		}
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
						const isActivePage = selectedPageId === el.id;
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
												imgField="galleryPageImgs"
												path={`/img/to/page/${editingPage?.id}`}
											/>
										) :
										(
											<h6 style={{ color: "gray" }}>После создания вам будет доступна загрузка фотографий</h6>
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
