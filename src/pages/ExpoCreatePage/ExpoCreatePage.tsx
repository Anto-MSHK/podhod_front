import React from 'react';
import styles from './ExpoCreatePage.module.css'
import {BtnGroupSelect} from "../../components/ButtonGroup/ButtonGroup";
import {FillForm} from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import {InfoComponent} from "../../components/InfoComponent/InfoComponent";
import errorIcon from '../../assets/icons/Icon9.svg'

const btnData = [
    {name: "Главный экран"},
    {name: "Экспонаты"},
    {name: "Карта"},
    {name: "Настройки"},
];

export const ExpoCreatePage = () => {
    return (
        <div className={styles.ExpoCreateWrapper}>
            <div className={styles.InfoWrapper}>
                <BtnGroupSelect view={'radio'} data={btnData}/>
                <div className={styles.FormWrapper}>
                    <div>
                        <FillForm/>
                    </div>
                    <div className={styles.ImgGalleryWrapper}>
                        <div className={styles.ImgGalleryTitle}>
                            <h3>Галерея</h3>
                            <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                        </div>
                        <ImagesGallery/>
                    </div>
                </div>
            </div>
            <div className={styles.PreviewWrapper}>
                <div>
                    <h3>Предпросмотр</h3>
                </div>
                <div className={styles.PreviewPicture}/>
                <div className={styles.InfoComponentWrapper}>
                    <InfoComponent title={'Не может быть опубликовано'} desc={'Есть незаполненные поля'}
                                   icon={errorIcon} />
                </div>
            </div>
        </div>
    );
};