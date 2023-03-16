import * as React from 'react';
import styles from './ExpoCreateNewPage.module.css';
import { useFormik } from 'formik';
import { ButtonArt } from '../../../components/ButtonArt/ButtonArt';
import { useAppDispatch } from './../../../app/hooks';
import { useAddPageMutation, useFetchPageQuery, useUpdatePageMutation } from '../../../app/services/EventsApi';
import { FormikConfig } from 'formik';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FormContainer } from '../../../components/AuthForm/Form';
import * as Yup from "yup";
import { FormInput } from '../../../components/AuthForm/FormInput';
import { CreateEventPageT, EventPagesT, UpdateEventPageT } from '../../../app/Types/EventsT';
import { setPage } from '../../../app/Slices/ExpoCreateSlice';

interface IAppProps {
}

interface formType {
    title: string;
    description: string;
    visibleLogo: boolean;
}

export const ExpoCreateNewPage: React.FC<IAppProps> = (props) => {
    const { page_id } = useParams();
    console.log(page_id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: defaultData, isFetching } = useFetchPageQuery(page_id);
    const [addPage, { isError }] = useAddPageMutation();
    const [updatePage, { isError: isErrorUpdate }] = useUpdatePageMutation();

    const handleAddPage = async (page: CreateEventPageT) => { return await addPage(page).unwrap(); };
    const handleUpdatePage = async (page: UpdateEventPageT) => { return await updatePage(page).unwrap(); };


    const formConfig: FormikConfig<formType> = {
        initialValues: {
            title: defaultData ? defaultData.title : '',
            description: defaultData ? defaultData.description : '',
            visibleLogo: true,
        },
        onSubmit: async (values, form) => {
            let page: CreateEventPageT = {
                name: values.title,
                description: values.description,
                imgs: [
                    {
                        id: 1,
                        description: '',
                        path: ''
                    }
                ],
                createdAt: new Date().toISOString(),
            };
            if (page_id) {
                let updatePage: UpdateEventPageT = {
                    id: page_id,
                    updatedAt: new Date().toISOString(),
                    name: values.title,
                    description: values.description
                };
                handleUpdatePage(updatePage);
            } else {
                const newPage = await handleAddPage(page);
                navigate(`pages/${newPage.id}`);
            }
            form.setSubmitting(false);
            dispatch(setPage(values));
            setEditing(false);
            alert(JSON.stringify(values, null, 2));
        }
    };
    const schemaConfig: Yup.ObjectShape = {
        pageTitle: Yup.string().required('Обязательное поле!'),
        description: Yup.string().required('Обязательное поле!')
    };

    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (!page_id) setEditing(true);
    }, [page_id]);

    const toggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
            {(formik) => (
                <div className={styles.fillForm_container}>
                    <div className={styles.asd}>
                        <h2>{`Создание страницы`}</h2>
                        <div style={{ display: "flex", gap: 15 }}>
                            {editing && (
                                <ButtonArt
                                    type="submit"
                                    disabled={
                                        !editing ||
                                        formik.isSubmitting ||
                                        Object.keys(formik.errors).length > 0
                                    }
                                >
                                    {editing ? "Сохранить" : "Изменить"}
                                </ButtonArt>
                            )}
                            {page_id && (
                                <ButtonArt type="button" onClick={toggleEditing}>
                                    {editing ? "Отмена" : "Редактировать"}
                                </ButtonArt>
                            )}
                        </div>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.form_info}>
                            <div className={styles.left}>
                                <FormInput
                                    name="pageTitle"
                                    label="Название страницы:"
                                    disabled={!editing}
                                />

                                <FormInput
                                    name="description"
                                    label="Описание:"
                                    type="textarea"
                                    disabled={!editing}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </FormContainer>
    );
};

