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

interface IFillFormProps {
}

interface formType {
    eventName: string;
    description: string;
    age: number;
    eventType: string;
    checked: string[];
}


export const ExpoCreateExhibitsPage: React.FC = () => {

    const {data} = useFetchExhibitsQuery();

    const Options = ["Выставка", "Экспозиция", "Показ мод"];
    const ages = [0, 6, 12, 16, 18];
    const agesOption = ages.map((age, index) => {
        return <option key={index}>{age + '+'}</option>;
    });
    const options = Options.map((text, index) => {
        return <option key={index}>{text}</option>;
    });

    const formConfig: FormikConfig<formType> = {
        initialValues: {
            eventName: "",
            description: "",
            age: ages[0],
            eventType: Options[0],
            checked: [],
        },
        onSubmit: (values, form) => {
            let event = {
                date: new Date().toISOString(),
                description: values.description,
                name: values.eventName,
                type: 'promo-exhibition',
                prices: [
                    {
                        criterion: 'VIP',
                        price: 200,

                    }
                ]
            }
            /*   alert(JSON.stringify(values, null, 2)); */
        },
    };

    const schemaConfig: Yup.ObjectShape = {
        eventName: Yup.string()
            .required("Обязательное поле!"),
        description: Yup.string()
            .required("Обязательное поле!"),
        age: Yup.string().required("Обязательное поле!"),
        eventType: Yup.string().required("Обязательное поле!"),
    };
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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
                                <div className={styles.exhibitsListWrapper} onClick={() => {setModal(true)}}>
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
                                <FormInput name='exhibitName' label="Короткое описание:"/>
                                <FormInput name='exhibitName' label="Полное описание:" type={'textarea'}/>
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
                            <ButtonArt color="primary" onClick={toggle}>
                                Сохранить
                            </ButtonArt>{' '}
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