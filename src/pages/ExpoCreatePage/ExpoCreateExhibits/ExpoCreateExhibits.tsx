import React, {useState} from 'react';
import styles from './ExpoCreateExhibits.module.css'
import ImagesGallery from "../../../components/ImagesGallery/imagesGallery";
import {FormInput} from '../../../components/AuthForm/FormInput';
import {FormContainer} from '../../../components/AuthForm/Form';
import * as Yup from "yup";
import {FormikConfig} from 'formik';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {ButtonArt} from "../../../components/ButtonArt/ButtonArt";
import {useFetchExhibitsQuery} from "../../../app/services/ExhibitsApi";
import {useAddExhibitMutation} from "../../../app/services/ExhibitsApi";
import {useDeleteExhibitMutation} from "../../../app/services/ExhibitsApi";
import {useAppDispatch} from "../../../app/hooks";
import {setExhibit} from "../../../app/Slices/ExhibitCreateSlice";
import {CreateExhibitPayloadT} from '../../../app/Types/ExhibitsT';
import deleteIcon from '../../../assets/icons/Icon6.svg'

interface formType {
    exhibitName: string;
    exhibitShort: string;
    exhibitDescription: string;
}


export const ExpoCreateExhibitsPage = () => {

        const toggle = () => setModal(!modal);
        const {data} = useFetchExhibitsQuery();
        const dispatch = useAppDispatch()
        const [addExhibit, {isError}] = useAddExhibitMutation()
    const [deleteExhibit] = useDeleteExhibitMutation();

        const handleDeleteExhibit = async (id: any) => {
            console.log('delete...')
            await deleteExhibit(id).unwrap();
        }
        const formConfig: FormikConfig<formType> = {
            initialValues: {
                exhibitName: '',
                exhibitShort: '',
                exhibitDescription: '',
            },
            onSubmit: (values, form) => {
                console.log('Submitting form...', values); // add console.log statement
                let exhibit: CreateExhibitPayloadT = {
                    date: new Date().toISOString(),
                    name: values.exhibitName,
                    short: values.exhibitShort,
                    description: values.exhibitDescription
                }
                dispatch(setExhibit(values))
                toggle()
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
        const [modal, setModal] = useState(false);

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
                                <div className={styles.exhibitsListWrapper}>
                                    <div>
                                        {el.name}
                                    </div>
                                </div>
                                <div className={styles.exhibitsDeleteWrapper} onClick={() => {handleDeleteExhibit(el.id)}}>
                                    <img src={deleteIcon}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Modal isOpen={modal} toggle={toggle} fullscreen
                       style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                    <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
                        {(formik) => (
                            <div>
                                <ModalHeader style={{backgroundColor: '#1E1E1E', color: 'white'}} toggle={toggle}>
                                    Экспонат</ModalHeader>
                                <ModalBody style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                                    <div>
                                        <div>
                                            <FormInput name='exhibitName' label="Название:"/>
                                            <FormInput name='exhibitShort' label="Короткое описание:"/>
                                            <FormInput name='exhibitDescription' label="Полное описание:"
                                                       type={'textarea'}/>
                                        </div>
                                        <h2>Медиа</h2>
                                        <div className={styles.media_wrapper}>
                                            <div className={styles.ImgGalleryWrapper}>
                                                <div className={styles.ImgGalleryTitle}>
                                                    <h3>Галерея</h3>
                                                    <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 :
                                                        2</p>
                                                </div>
                                                <ImagesGallery type='galleryImages'/>
                                            </div>
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