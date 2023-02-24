import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'



interface IImagesGallery {

}


const ImagesGallery: React.FC<IImagesGallery> = () => {
    const [images, setImages] = useState<FileList>()
    console.log(images);
    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images}>
            
            </div>
            <div className={styles.drag_and_drop}>
                <DragAndDrop/>
            </div>
        </div>

    );
};

export default ImagesGallery