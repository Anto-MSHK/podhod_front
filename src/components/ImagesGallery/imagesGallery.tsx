import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ImageComponent from './ImageComponent';
import { randomInt } from 'crypto';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { swapImage } from '../../app/Slices/imagesUploadSlice';



interface IImagesGallery {

}


const ImagesGallery: React.FC<IImagesGallery> = () => {

    const images = useAppSelector(state => state.images.uploadedImages)
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
        /*   const newItems = [...items];
          const draggedItem = newItems[draggedIndex];
          newItems.splice(draggedIndex, 1);
          newItems.splice(index, 0, draggedItem); */
        dispatch(swapImage({
            draggedIndex: draggedIndex as number,
            index,
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
                                opacity: draggedIndex ? 0.5 : 1,
                                border: draggedIndex === index ? '5px solid blue' : 'none',
                                backgroundColor: dragOverIndex === index ? "lightgray" : "white",
                                cursor: "move"
                            }}
                        >
                            <ImageComponent image={image} key={image.id} />
                        </div>
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