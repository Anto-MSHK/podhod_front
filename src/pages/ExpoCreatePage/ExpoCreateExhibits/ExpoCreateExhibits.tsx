import React, { useRef, useEffect, useState } from 'react';
import styles from './ExpoCreateExhibits.module.css'
import { FillForm } from "../../../components/FillForm/FillForm";
import ImagesGallery from "../../../components/ImagesGallery/imagesGallery";
import { FormInput } from '../../../components/AuthForm/FormInput';
import { FormContainer } from '../../../components/AuthForm/Form';
import * as Yup from "yup";
import { FormikConfig, FormikProps } from 'formik';
import { type } from 'os';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface IFillFormProps { }
interface formType {
    eventName: string;
    description: string;
    age: number;
    eventType: string;
    checked: string[];
}


export const ExpoCreateExhibitsPage: React.FC = () => {

    const Options = ["Выставка", "Экспозиция", "Показ мод"];
    const ages = [0, 6, 12, 16, 18];
    const agesOption = ages.map((age, index) => {
        return <option key={index}>{age+'+'}</option>;
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
                        <Button onClick={() => {setModal(true)}}>Открыть модалку</Button>
                    </div>
                    <Modal isOpen={modal} toggle={toggle} fullscreen >
                <ModalHeader style={{backgroundColor: 'black', color: 'white'}} toggle={toggle}>Создать экспонат</ModalHeader>
                <ModalBody style={{backgroundColor: 'black', color: 'white'}}>
                <div>
                        <FormInput name='exhibitName' label="Название:" />
                        <FormInput name='exhibitName' label="Короткое описание:" />
                        <FormInput name='exhibitName' label="Полное описание:" type={'textarea'} />
                    </div>
                    <h2>Медиа</h2>
                    <div className={styles.media_wrapper}>
                        <div className={styles.ImgGalleryWrapper}>
                            <div className={styles.ImgGalleryTitle}>
                                <h3>Галерея</h3>
                                <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                            </div>
                            <ImagesGallery type='galleryImages' />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter style={{backgroundColor: 'black', color: 'white'}}>
                  <Button color="primary" onClick={toggle}>
                    Do Something
                  </Button>{' '}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
                </div>
            )}
        </FormContainer>
    );
};