import * as React from "react";
import styles from "./ChapterForm.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { useState, useEffect } from "react";
import { FormContainer } from "../Form/Form";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { FormInput } from "../Form/FormInput";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { AddChapterReqT, useAddChapterMutation } from "../../app/services/ChapterApi";

interface ChapterFormConfigT {
    title: string;
    description: string;
}
interface ChapterFormT {
    defaultData?: any
    eventId: string,
    showPieceId: string,
}
export const ChapterForm: React.FC<ChapterFormT> = ({ defaultData, showPieceId, eventId}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [addChapter] = useAddChapterMutation()
    const [editing, setEditing] = useState(false);

    const formConfig: FormikConfig<ChapterFormConfigT> = {
        initialValues: {
            title: '',
            description: "",
        },
        onSubmit: async (values, form) => {
            let chapter: AddChapterReqT = {
                body: {
                    title: values.title,
                description: values.description
                } ,
                eventId: eventId,
                showpieceId: showPieceId,
            }
            try {
                const payload = await addChapter(chapter).unwrap()
                console.log(payload)
            } catch (error) {
                console.log(error)
            }
            
        },
    };
    const schemaConfig: Yup.ObjectShape = {
        title: Yup.string().required("Обязательное поле!"),
        description: Yup.string().required("Обязательное поле!"),
    };

    useEffect(() => {
        if (!id) setEditing(true);
    }, [id]);


    const toggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <div className = {styles.chapter_form_wrapper}>
            <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
                {formik => (
                    <div className={styles.fillForm_container}>
                        <div className={styles.asd}>
                            <h2>{`Создание раздела`}</h2>
                        </div>
                        <div className={styles.form}>
                            <div className={styles.form_info}>
                                <FormInput name="title" label="Название:" />
                                <FormInput name="description" label="Описание:" />
                            </div>
                        </div>
                            <div style={{ display: "flex", gap: 15 }}>
                                    <CustomBtn
                                        type="submit"
                                    >
                                        Создать
                                    </CustomBtn>
                             
                            </div>
                    </div>
                )}
            </FormContainer>
        </div>
    );
};
