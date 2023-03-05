import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import ImageComponent from './ImageComponent';
import { swapImage, ImagesArrayType } from '../../app/Slices/imagesUploadSlice';




interface IImagesGallery {
    type: ImagesArrayType
}


const ImagesGallery: React.FC<IImagesGallery> = ({ type }) => {

    const images = useAppSelector(state => state.images[type])
    const dispatch = useAppDispatch()
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
        console.log('draged ' + draggedIndex);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        setDragOverIndex(index);
        console.log();
        console.log('dragedOver ' + dragOverIndex);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        event.preventDefault();
        console.log('index= ' + index + ' draggedIndex= ' + draggedIndex);
        dispatch(swapImage({
            draggedIndex: draggedIndex as number,
            index,
            key: type
        }))
        setDraggedIndex(null);
        setDragOverIndex(null);
    };


    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images_wrapper}>
                {
                    images &&
                    images.map((image, index) => (
                        <div
                            key={index}
                            className={styles.image_container}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDrop={(e) => handleDrop(e, index)}
                            style={{
                                opacity: draggedIndex === index ? 0.5 : 1,
                                border: draggedIndex === index ? '5px solid #df791a' : 'none',
                                backgroundColor: dragOverIndex === index ? "lightgray" : "white",
                                scale: dragOverIndex === index ? "1.05" : "1",
                                cursor:   "pointer"
                            }}
                        >
                            <ImageComponent type= {type} image={image}  />
                        </div>
                    ))
                }
              
            </div>

            <div className={styles.drag_and_drop}>
                <DragAndDrop type={type} />
            </div>
        </div>

    );
};

export default ImagesGallery