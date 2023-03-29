import React, { useState } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import styles from "./ImageSingle.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ImageItem from "../ImageItem/ImageItem";
import { Spinner } from "reactstrap";
import { useParams } from "react-router-dom";
import {
  ImagesArrayType,
  SingleType,
} from "../../app/Slices/imagesUploadSlice";

interface ISingleImageUpload {
  imgField: SingleType;
  title?: string;
  help?: string;
  textButton?: string;
  path: string;
  isLoading: boolean;
}

export const ImageSingle: React.FC<ISingleImageUpload> = ({
  imgField,
  title,
  help,
  textButton,
  path,
  isLoading,
}) => {
  const { id } = useParams();
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
          {image && !isLoading ? (
            <ImageItem
              field={imgField}
              type="single"
              image={image}
              className={styles.img}
            />
          ) : !isLoading || !id ? (
              <div className={styles.drag_and_drop_container}>
                <DragAndDrop
                    field={imgField}
                    type="single"
                    text={textButton}
                    path={path}
                />
              </div>
          ) : (
            <div className={styles.img}>
              <Spinner type="grow" className={styles.spinner} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
