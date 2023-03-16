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
    name: string;
    description: string;
    visibleLogo: boolean;
}

export const ExpoCreateNewPage: React.FC<IAppProps> = (props) => {
    const { id, page_id } = useParams();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: defaultData, isFetching } = useFetchPageQuery({ page_id });
    const [addPage, { isError }] = useAddPageMutation();
    const [updatePage, { isError: isErrorUpdate }] = useUpdatePageMutation();

    const handleAddPage = async (page: CreateEventPageT, id: string) => { return await addPage({ id, page }).unwrap(); };
    const handleUpdatePage = async (page: UpdateEventPageT, id: string) => { return await updatePage({ id, page }).unwrap(); };

    const formConfig: FormikConfig<formType> = {
        initialValues: {
            name: defaultData ? defaultData.name : '',
            description: defaultData ? defaultData.description : '',
            visibleLogo: true,
        },
        onSubmit: async (values, form) => {
            let page: CreateEventPageT = {
                name: values.name,
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
                    name: values.name,
                    description: values.description
                };
                handleUpdatePage(updatePage, id!);
            } else {
                const newPage = await handleAddPage(page, id!);
                navigate(`${id}/pages/${newPage.id}`);
            }
            form.setSubmitting(false);
            dispatch(setPage(values));
            setEditing(false);
            alert(JSON.stringify(values, null, 2));
        }
    };
    const schemaConfig: Yup.ObjectShape = {
        name: Yup.string().required('Обязательное поле!'),
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
                                    name="name"
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

