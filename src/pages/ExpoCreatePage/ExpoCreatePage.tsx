import React from 'react';
import styles from './ExpoCreatePage.module.css'
import { BtnGroupSelect } from "../../components/ButtonGroup/ButtonGroup";
import { FillForm } from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import { InfoComponent } from "../../components/InfoComponent/InfoComponent";
import errorIcon from '../../assets/icons/Icon9.svg'
import { useAppSelector } from '../../app/hooks';
import { type } from 'os';

import ImageComponent from '../../components/ImagesGallery/ImageComponent';

const btnData = [
    { name: "Главный экран" },
    { name: "Экспонаты" },
    { name: "Карта" },
    { name: "Настройки" },
];


export const ExpoCreatePage = () => {

    const event = useAppSelector(state => state.eventCreate.event)
    const backGroundImages = useAppSelector(state => state.images.backGroundImages)
    const galleryImages = useAppSelector(state => state.images.galleryImages)

    return (
        <div className={styles.ExpoCreateWrapper}>
            <div className={styles.InfoWrapper}>
                <BtnGroupSelect view={'radio'} data={btnData} />
                <div className={styles.FormWrapper}>
                    <div>
                        <FillForm />
                    </div>
                    <div className={styles.ImgGalleryWrapper}>
                        <div className={styles.ImgGalleryTitle}>
                            <h3>Галерея</h3>
                            <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                        </div>
                        <ImagesGallery type='galleryImages' />
                    </div>
                    <div className={styles.ImgGalleryWrapper}>
                        <div className={styles.ImgGalleryTitle}>
                            <h3>Задний фон</h3>
                            <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                        </div>
                        <ImagesGallery type='backGroundImages' />
                    </div>
                </div>
            </div>
            <div className={styles.PreviewWrapper}>
                <div>
                    <h2>Предпросмотр</h2>
                </div>
                <div className={styles.preview_picture} style={{ backgroundImage: backGroundImages.length ? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 100%),  url(${backGroundImages[0].url})` : 'none' }}>
                    <div className={styles.preview_picture__header}>
                        <div className={styles.preview_picture__logo}>
                            Типа лого или что там
                        </div>
                        <div className={styles.preview_picture__age}>
                            <p>{event?.age}</p>
                        </div>
                    </div>
                    <div className={styles.preview_picture__content}>
                        <div className={styles.preview_picture__event_name}>
                            <h2>{event?.eventName}</h2>
                        </div>
                        <div className={styles.preview_picture__description}>
                            <p>{event?.description}</p>
                        </div>
                    </div>
                    <div className={styles.preview_images}>
                        {/*  <ScrollableImages images={galleryImages} type = 'galleryImages'/> */}
                        {
                            galleryImages.map((image) => (
                                <div className={styles.preview_image_container}>
                                    <ImageComponent image={image} type='galleryImages' />
                                </div>

                            ))
                        }
                    </div>
                    <div className={styles.preview_picture__footer}>
                        <div className={styles.preview_picture__move_btn}>
                            <p>Перейти к выставке --{`>`}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.InfoComponentWrapper}>
                    <InfoComponent title={'Не может быть опубликовано'} desc={'Есть незаполненные поля'}
                        icon={errorIcon} />
                </div>
            </div>
        </div>
    );
};