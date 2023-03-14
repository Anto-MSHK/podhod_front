import React, {useState} from 'react';
import styles from './ExpoCreateExhibits.module.css'
import {FormInput} from '../../../components/AuthForm/FormInput';
import {FormContainer} from '../../../components/AuthForm/Form';
import * as Yup from "yup";
import {FormikConfig} from 'formik';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {ButtonArt} from "../../../components/ButtonArt/ButtonArt";
import {
    useFetchExhibitsQuery,
    useAddExhibitMutation,
    useDeleteExhibitMutation,
    useUpdateExhibitMutation
} from "../../../app/services/ExhibitsApi";
import {useAppDispatch} from "../../../app/hooks";
import {setExhibit} from "../../../app/Slices/ExhibitCreateSlice";
import {CreateExhibitPayloadT, UpdateExhibitPayloadT} from '../../../app/Types/ExhibitsT';
import deleteIcon from '../../../assets/icons/Icon6.svg'

interface formType {
    exhibitName: string;
    exhibitShort: string;
    exhibitDescription: string;
}


export const ExpoCreateExhibitsPage = () => {

        const [modal, setModal] = useState(false);
        const {data} = useFetchExhibitsQuery();
        const [addExhibit] = useAddExhibitMutation();
        const [updateExhibit] = useUpdateExhibitMutation();
        const [deleteExhibit] = useDeleteExhibitMutation();
        const [editingExhibit, setEditingExhibit] = useState<any>(null);
        const dispatch = useAppDispatch()

        const toggle = () => setModal(!modal);

        const handleEditExhibit = (exhibit: any) => {
            console.log(exhibit)
            setEditingExhibit(exhibit);
            toggle();
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
            addExhibit(exhibit);
            toggle()
        };

        const handleUpdateExhibit = (values: formType) => {
            console.log("Updating exhibit...", values);
            if (editingExhibit !== null) {
                let exhibit: UpdateExhibitPayloadT = {
                    name: values.exhibitName,
                    description: values.exhibitDescription,
                };
                updateExhibit({id: editingExhibit.id, data: exhibit});
                toggle()
            }
        };

        const handleDeleteExhibit = async (id: any) => {
            console.log('delete...')
            await deleteExhibit(id).unwrap();
        }


        const formConfig: FormikConfig<formType> = {
            initialValues: {
                exhibitName: editingExhibit && editingExhibit.id === null ? '' : editingExhibit && editingExhibit.name,
                exhibitShort: editingExhibit && editingExhibit.id === null ? '' : editingExhibit && editingExhibit.short,
                exhibitDescription: editingExhibit && editingExhibit.id === null ? '' : editingExhibit && editingExhibit.description,
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
            exhibitName: Yup.string()
                .required("Обязательное поле!"),
            exhibitShort: Yup.string()
                .required("Обязательное поле!"),
            exhibitDescription: Yup.string()
                .required("Обязательное поле!"),
        };

        return (
            <div className={styles.main_page_form_wrapper}>
                <div>
                    <ButtonArt onClick={() => {
                        setModal(true)
                    }}>Создать экспонат</ButtonArt>
                </div>
                <div>
                    {data && data.map((el: any) => {
                        return (
                            <div className={styles.mainCreateExhibitWrapper}>
                                <div className={styles.exhibitsListWrapper} onClick={() => handleEditExhibit(el)}>
                                    <div>
                                        {el.name}
                                    </div>
                                </div>
                                <div className={styles.exhibitsDeleteWrapper} onClick={() => {
                                    handleDeleteExhibit(el.id)
                                }}>
                                    <img src={deleteIcon}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Modal isOpen={modal} toggle={toggle} size={'xl'} contentClassName={styles.modalWrapper}
                       style={{backgroundColor: '#1E1E1E', color: 'white'}} onClosed={() => {
                    setEditingExhibit(null)
                }}>
                    <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
                        {(formik) => (
                            <div>
                                <ModalHeader style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                                    {editingExhibit === null ? 'Создание экспоната' : 'Редактирование экспоната'}</ModalHeader>
                                <ModalBody style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                                    <div>
                                        <div>
                                            <FormInput name='exhibitName' label="Название:"/>
                                            <FormInput name='exhibitShort' label="Короткое описание:"/>
                                            <FormInput name='exhibitDescription' label="Полное описание:"
                                                       type={'textarea'}/>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                                    <ButtonArt color="primary" type="submit">
                                        Сохранить
                                    </ButtonArt>
                                    <ButtonArt onClick={toggle}>
                                        Отменить
                                    </ButtonArt>
                                </ModalFooter>
                            </div>
                        )}
                    </FormContainer>
                </Modal>
            </div>
        );
    }
;