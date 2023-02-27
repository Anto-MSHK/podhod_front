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
    const [isDragged, setIsDragged] = useState(false)
    const [dragCounter, setDragCounter] = useState(0)

    const onDrag = (e: DraggableEvent, data: DraggableData) => {
        e.preventDefault()
        setIsDragged(true)
        setDragCounter((prevState) => prevState+1)
    }
    const onMouseDown = (e:MouseEvent) => {
        e.preventDefault()
       
      
        console.log(dragCounter);
    }

    const onStop = (e: DraggableEvent, id: string) => {
        console.log(images);
        e.preventDefault()
        dispatch(swapImage({
            counter: dragCounter,
            id,
        }))
        console.log(images);
        setDragCounter(0)
    }


    return (
        <div className={styles.images_gallery_wrapper}>
            <div className={styles.images_wrapper}>
                {
                    images &&
                    images.map(image => (
                        <Draggable

                            axis='x'
                            handle=".handle"
                            
                            onDrag={(e, data) => onDrag(e, data)}
                            onMouseDown={(e) =>  onMouseDown(e)}
                        
                            onStop={(e) => onStop(e, image.id )}

                            grid={[180, 0]}>
                            <div  className='handle'>
                                <div className={styles.image_container}>
                                    <ImageComponent isDragged={isDragged} image={image} key={image.id} />
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