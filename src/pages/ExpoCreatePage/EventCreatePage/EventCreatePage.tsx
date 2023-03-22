import React, { useState } from "react";
import styles from "./EventCreatePages.module.css";
import { FormInput } from "../../../components/AuthForm/FormInput";
import { FormContainer } from "../../../components/AuthForm/Form";
import * as Yup from "yup";
import { FormikConfig, Field } from 'formik';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import { useAppDispatch } from "../../../app/hooks";
import {
    CreateExhibitPayloadT,
    UpdateExhibitPayloadT,
} from "../../../app/Types/ExhibitsT";
import deleteIcon from "../../../assets/icons/Icon6.svg";
import { useParams } from "react-router-dom";
import { useAddPageMutation, useDeletePageMutation, useFetchPageQuery, useUpdatePageMutation } from "../../../app/services/EventPages.Api";
import { CreateExpoPagePayloadT, UpdateExpoPagePayloadT, EventPagesT } from '../../../app/Types/EventPageT';
import { setPage } from "../../../app/Slices/ExpoCreatePageSlice";

interface formType {
    pageName: string;
    pageDescription: string;
    visibleLogo: boolean,
}

export const EventCreatePages = () => {
    const { id: eventId } = useParams();
    const [modal, setModal] = useState(false);
    const { data, isLoading } = useFetchPageQuery(eventId)
    const [addPage] = useAddPageMutation();
    const [updatePage] = useUpdatePageMutation();
    const [deletePage] = useDeletePageMutation();
    const [editingPage, setEditingPage] = useState<any>(null);
    const dispatch = useAppDispatch();

    const toggle = () => setModal(!modal);

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
            updatePage({ body: page, eventId: eventId as string, id: editingPage.id }).unwrap();
            toggle();
        }
    };

    const handleDeletePage = async (id: any) => {
      await deletePage({eventId: eventId as string, id}).unwrap();
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
            visibleLogo:
                editingPage && editingPage.id === null
                    ? false
                    : editingPage && editingPage.visibleLogo
        },
        onSubmit: (values, form) => {
            if (!editingPage) {
                handleAddPage(values);
            } else {
                 handleUpdatePage(values);
            }
        },
    };

    const schemaConfig: Yup.ObjectShape = {
        pageName: Yup.string().required("Обязательное поле!"),
        pageDescription: Yup.string(),
        visibleLogo: Yup.boolean(),
    };

    return (
        <div className={styles.main_page_form_wrapper}>
            <div>
                <ButtonArt
                    onClick={() => {
                        setModal(true);
                    }}
                >
                    Создать страницу
                </ButtonArt>
            </div>
            <div>
                {!isLoading &&
                    data &&
                    data.map((el: EventPagesT,index) => {
                        return (
                            <div key={el.id} className={styles.mainCreatePageWrapper}>
                                <div
                                    className={styles.pagesListWrapper}
                                    onClick={() => handleEditPage(el)}
                                >
                                    <div>{el.name}</div>
                                </div>
                                <div
                                    className={styles.pagesDeleteWrapper}
                                onClick={() => {
                                  handleDeletePage(el.id);
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
                    {(formik) => (
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
                                        <FormInput name="pageName" label="Название:" />
                                        <FormInput
                                            name="pageDescription"
                                            label="Полное описание:"
                                            type={"textarea"}
                                        />
                                        <FormInput name='visibleLogo' label="Показывать логотип" type='checkbox' />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter
                                style={{ backgroundColor: "#1E1E1E", color: "white" }}
                            >
                                <ButtonArt color="primary" type="submit">
                                    Сохранить
                                </ButtonArt>
                                <ButtonArt onClick={toggle}>Отменить</ButtonArt>
                            </ModalFooter>
                        </>
                    )}
                </FormContainer>
            </Modal>
        </div>
    );
};
