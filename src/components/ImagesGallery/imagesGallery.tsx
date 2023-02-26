import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'
import { useAppSelector } from '../../app/hooks';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ImageComponent from './ImageComponent';
import { randomInt } from 'crypto';



interface IImagesGallery {

}


const ImagesGallery: React.FC<IImagesGallery> = () => {

    const images = useAppSelector(state => state.images.uploadedImages)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal);

    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images_wrapper}>
                {
                    images &&
                    images.map(image => (
                        <ImageComponent image={image} key = {image.id}/>
                    ))
                }
            </div>

            <div className={styles.drag_and_drop}>
                <DragAndDrop />
            </div>
        </div>

    );
};

export default ImagesGallery