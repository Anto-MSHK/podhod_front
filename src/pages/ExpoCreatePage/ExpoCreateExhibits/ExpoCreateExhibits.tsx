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
import {useAppDispatch} from "../../../app/hooks";
import {setExhibit} from "../../../app/Slices/ExhibitCreateSlice";

interface formType {
    exhibitName: string;
    exhibitShort: string;
    exhibitDescription: string;
}


export const ExpoCreateExhibitsPage: React.FC = () => {

    const toggle = () => setModal(!modal);
    const {data} = useFetchExhibitsQuery();
    const dispatch = useAppDispatch()
    const [addExhibit, {isError}] = useAddExhibitMutation()
    const handleAddExhibit = async (exhibit: any) => {
        console.log('sss');
        await addExhibit(exhibit).unwrap()
    }

    const formConfig: FormikConfig<formType> = {
        initialValues: {
            exhibitName: '',
            exhibitShort: '',
            exhibitDescription: '',
        },
        onSubmit: (values, form) => {
            let exhibit: any = {
                exhibitName: values.exhibitName,
                exhibitShort: values.exhibitShort,
                exhibitDescription: values.exhibitDescription
            }
            handleAddExhibit(exhibit)
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
        <FormContainer schemaConfig={schemaConfig} formConfig={formConfig}>
            {(formik) => (
                <div className={styles.main_page_form_wrapper}>
                    <div>
                        <ButtonArt onClick={() => {
                            setModal(true)
                        }}>Создать экспонат</ButtonArt>
                    </div>
                    <div>
                        {data && data.map((el: any) => {
                            return (
                                <div className={styles.exhibitsListWrapper} onClick={() => {
                                    setModal(true)
                                }}>
                                    {el.name}
                                </div>
                            )
                        })}
                    </div>
                    <Modal isOpen={modal} toggle={toggle} fullscreen
                           style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                        <ModalHeader style={{backgroundColor: '#1E1E1E', color: 'white'}} toggle={toggle}>
                            Экспонат</ModalHeader>
                        <ModalBody style={{backgroundColor: '#1E1E1E', color: 'white'}}>
                            <div>
                                <FormInput name='exhibitName' label="Название:"/>
                                <FormInput name='exhibitShort' label="Короткое описание:"/>
                                <FormInput name='exhibitDescription' label="Полное описание:" type={'textarea'}/>
                            </div>
                            <h2>Медиа</h2>
                            <div className={styles.media_wrapper}>
                                <div className={styles.ImgGalleryWrapper}>
                                    <div className={styles.ImgGalleryTitle}>
                                        <h3>Галерея</h3>
                                        <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                                    </div>
                                    <ImagesGallery type='galleryImages'/>
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
                    </Modal>
                </div>
            )}
        </FormContainer>
    );
};