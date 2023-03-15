import React, { useState } from "react";
import DragAndDrop from "../DragAndDrop/dragAndDrop";
import styles from "./SingleImageUpload.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ImageComponent from "../ImagesGallery/ImageComponent";
import {
  swapImage,
  ImagesArrayType,
  SingleType,
} from "../../app/Slices/imagesUploadSlice";

interface ISingleImageUpload {
  imgField: SingleType;
  title?: string;
  help?: string;
  textButton?: string;
}

export const SingleImageUpload: React.FC<ISingleImageUpload> = ({
  imgField,
  title,
  help,
  textButton,
}) => {
  const image = useAppSelector((state) => state.images[imgField]);
  const dispatch = useAppDispatch();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    console.log("draged " + draggedIndex);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    setDragOverIndex(index);
    console.log();
    console.log("dragedOver " + dragOverIndex);
  };

  return (
    <div className={styles.images_gallery_wrapper}>
      <div className={styles.ImgGalleryWrapper}>
        {title && (
          <div className={styles.ImgGalleryTitle}>
            <h3>{title}</h3>
            <p>{help}</p>
          </div>
        )}
        <div className={styles.images_wrapper}></div>
        <div className={styles.drag_and_drop}>
          {image ? (
            <ImageComponent
              field={imgField}
              type="single"
              image={image}
              className={styles.img}
            />
          ) : (
            <DragAndDrop field={imgField} type="single" text={textButton} />
          )}
        </div>
      </div>
    </div>
  );
};
