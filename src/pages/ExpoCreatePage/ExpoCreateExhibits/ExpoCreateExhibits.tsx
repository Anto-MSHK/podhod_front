import React, { useRef, useEffect, useState } from 'react';
import styles from './ExpoCreateExhibits.module.css'
import { FillForm } from "../../../components/FillForm/FillForm";
import ImagesGallery from "../../../components/ImagesGallery/imagesGallery";


export const ExpoCreateExhibitsPage: React.FC = () => {

    return (
        <div className={styles.main_page_form_wrapper}>
            <div>
              {/*   <FillForm /> */}
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
        </div>
    );
};