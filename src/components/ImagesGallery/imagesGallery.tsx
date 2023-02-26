import React, { useState } from 'react';
import DragAndDrop from '../DragAndDrop/dragAndDrop';
import styles from './imagesGallery.module.css'
import { useAppSelector } from '../../app/hooks';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ImageComponent from './ImageComponent';
import { randomInt } from 'crypto';
import Draggable, { DraggableEvent } from 'react-draggable';



interface IImagesGallery {

}


const ImagesGallery: React.FC<IImagesGallery> = () => {

    const images = useAppSelector(state => state.images.uploadedImages)
    const [isDragged, setIsDragged] = useState(false)
    const onDrag = (e: DraggableEvent) => {
        e.preventDefault()
        setIsDragged(true)
    }
    const onMouseDown = (e: MouseEvent) =>{
        e.preventDefault()
        setIsDragged(false)
    }
    

    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images_wrapper}>
                {
                    images &&
                    images.map(image => (
                        <Draggable axis="x" 
                        handle=".handle" 
                        onDrag={(e) => onDrag(e)}
                        onMouseDown = {(e)=> onMouseDown(e)}
                        
                        grid ={[images.length, 0]}>
                            <div className='handle'>
                                <div className={styles.image_container}>
                                    <ImageComponent isDragged ={isDragged} image={image} key={image.id} />
                                </div>
                            </div>
                        </Draggable>

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