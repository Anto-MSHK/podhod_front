import React, { useState } from 'react';
import styles from './Preview.module.css'
import { useAppSelector } from '../../app/hooks';
import ImageComponent from '../ImagesGallery/ImageComponent';

interface IPreview {

}
const Preview: React.FC = () => {
    const event = useAppSelector(state => state.eventCreate.event)
    const exhibit = useAppSelector(state => state.exhibitCreate.exhibit)
    const backGroundImages = useAppSelector(state => state.images.backGroundImages)
    const galleryImages = useAppSelector(state => state.images.galleryImages)
    return (
        <div className={styles.preview_picture} style={{ backgroundImage: backGroundImages.length ? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 100%),  url(${backGroundImages[0].url})` : 'none' }}>
            <div className={styles.preview_picture__header}>
                <div className={styles.preview_picture__logo}>
                    {
                        event?.checked.includes('showLogo') &&
                        <p>Типа лого</p>
                    }
                </div>
                <div className={styles.preview_picture__age}>
                    <p>{event?.age}</p>
                </div>
            </div>
            <div className={styles.preview_picture__content}>
                <div className={styles.preview_picture__event_type}>
                    {
                        event?.checked.includes('showLogo') &&
                        <h3>{event?.eventType}</h3>
                    }
                </div>
                <div className={styles.preview_picture__event_name}>
                    <h2>{event?.eventName}</h2>
                </div>
                <div className={styles.preview_picture__description}>
                    <p>{event?.description}</p>
                </div>
            </div>
            <div className={styles.preview_images}>

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
    );

}
export default Preview;
