import React, { useRef, useEffect } from 'react';
import styles from './ExpoCreatePage.module.css'
import { BtnGroupSelect } from "../../components/ButtonGroup/ButtonGroup";
import { FillForm } from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import { InfoComponent } from "../../components/InfoComponent/InfoComponent";
import errorIcon from '../../assets/icons/Icon9.svg'
import { useAppSelector } from '../../app/hooks';
import { type } from 'os';

import ImageComponent from '../../components/ImagesGallery/ImageComponent';
import Preview from '../../components/PreviewComponent/Preview';


const btnData = [
    { name: "Главный экран", lable: 'mainScreen' },
    { name: "Экспонаты", lable: 'exhibits' },
    { name: "Карта", lable: 'map' },
    { name: "Настройки", lable: 'settings' },
];


export const ExpoCreatePage = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        
        const handleScroll = () => {
            setTimeout(() => {
                if (containerRef.current) {

                    containerRef.current.style.transform = `translateY(${window.scrollY}px)`;
                }
            }, 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
            <div ref={containerRef} className={styles.preview_wrapper} style={{}}>
                <div className={styles.preview__container}>
                    <div>
                        <h2>Предпросмотр</h2>
                    </div>
                    <Preview />
                </div>
                <div className={styles.InfoComponentWrapper}>
                    <InfoComponent title={'Не может быть опубликовано'} desc={'Есть незаполненные поля'}
                        icon={errorIcon} />
                </div>
            </div>
        </div>
    );
};