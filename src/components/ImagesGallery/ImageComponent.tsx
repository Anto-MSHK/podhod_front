import React, { useState } from "react";
import styles from "./imagesGallery.module.css";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
  imageType,
  removeImage,
  ImagesArrayType,
  SingleType,
  removeImages,
} from "../../app/Slices/imagesUploadSlice";
import { useAppDispatch } from "../../app/hooks";

interface IImageComponent {
  image: imageType;
  field: ImagesArrayType | SingleType;
  type: "gallery" | "single";
  className?: string;
}

const ImageComponent: React.FC<IImageComponent> = ({
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

  const delImage = (id: string) => {
    if (type === "gallery")
      dispatch(
        removeImage({
          id,
          key: field as SingleType,
        })
      );
    else
      dispatch(
        removeImages({
          id,
          key: field as ImagesArrayType,
        })
      );
  };

  return (
    <>
      <div onClick={() => toggle()}>
        <img
          className={className ? className : styles.image}
          src={image.url}
          alt=""
        />
      </div>
      <Modal
        backdrop={true}
        className={styles.modal_image_wrapper}
        isOpen={modal}
      >
        <ModalHeader toggle={toggle}>
          <h3>{image.name}</h3>
        </ModalHeader>
        <ModalBody draggable={false} className={styles.modal_image_container}>
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

export default ImageComponent;
