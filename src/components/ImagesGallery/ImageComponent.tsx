import React, { useState } from 'react';
import styles from './imagesGallery.module.css'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { imageType, removeImage, ImagesArrayType } from '../../app/Slices/imagesUploadSlice';
import { useAppDispatch } from '../../app/hooks';



interface IImageComponent {
    image: imageType
    type: ImagesArrayType
}


const ImageComponent: React.FC<IImageComponent> = ({ image, type }) => {

    const [modal, setModal] = useState(false)
    const dispatch = useAppDispatch()


    const toggle = () => {
        setModal(!modal)
    };

    const delImage = (id: string) => {
        dispatch(removeImage({
            id,
            key: type
        }))
    }

    return (
        <>
            <div onClick={() => toggle()}>
                <img className={styles.image} src={image.url} alt="" />
            </div>
            <Modal backdrop={true} className={styles.modal_image_wrapper} isOpen={modal}>
                <ModalHeader toggle={toggle}>
                    <h3>{image.name}</h3>
                </ModalHeader>
                <ModalBody draggable = {false} className={styles.modal_image_container}>
                    <img className={styles.modal_image} src={image.url} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => delImage(image.id)}>
                        <p>Удалить изображение</p>
                    </Button>
                </ModalFooter>
            </Modal>
        </>

    );
};

export default ImageComponent