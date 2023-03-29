import React, { useState } from "react";
import styles from "./ImageItem.module.css";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  imageType,
  ImagesArrayType,
  SingleType,
  deleteEventImg,
} from "../../app/Slices/imagesUploadSlice";
import { useAppDispatch } from "../../app/hooks";

interface IImageComponent {
  image: imageType;
  field: ImagesArrayType | SingleType;
  type: "gallery" | "single";
  className?: string;
}

const ImageItem: React.FC<IImageComponent> = ({
  image,
  type,
  field,
  className,
}) => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const delImage = (id: number) => {};

  return (
    <>
      <div onClick={() => toggle()}>
        <div
          className={styles.closeIcon}
          onClick={() => {
            dispatch(deleteEventImg(`/img/${image.id}`));
          }}
        />
        <img
          className={className ? className : styles.image}
          src={image.path}
          style={{ cursor: "pointer" }}
          alt=""
        />
      </div>
      <Modal
        backdrop={true}
        className={styles.modal_image_wrapper}
        isOpen={modal}
      >
        <ModalHeader toggle={toggle}>
          <h3>{image.description}</h3>
        </ModalHeader>
        <ModalBody draggable={false} className={styles.modal_image_container}>
          <img className={styles.modal_image} src={image.path} />
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

export default ImageItem;
