import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'
import { useAppSelector } from '../../app/hooks';



interface IImagesGallery {

}


const ImagesGallery: React.FC<IImagesGallery> = () => {
    const images = useAppSelector(state => state.images.uploadedImages)
 
    
    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images_wrapper}>
               {
                  images && 
                  images.map(image => (
                    <div className = {styles.image_container} key={image.name + Date.now()}>
                        <img className={styles.image} src={image.url} alt="" />
                    </div>
                  ))
               }
            </div>
            <div className={styles.drag_and_drop}>
                <DragAndDrop/>
            </div>
        </div>

    );
};

export default ImagesGallery