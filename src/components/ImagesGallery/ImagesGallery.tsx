import React, { useState } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";
import styles from "./ImagesGallery.module.css";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ImageItem from "../ImageItem/ImageItem";
import {
  ImagesArrayType,
  SingleType,
} from "../../app/Slices/imagesUploadSlice";

interface IImagesGallery {
  imgField: ImagesArrayType;
  path: string;
}

const ImagesGallery: React.FC<IImagesGallery> = ({ imgField, path }) => {
  const images = useAppSelector((state) => state.images[imgField]);
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

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    console.log("index= " + index + " draggedIndex= " + draggedIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={styles.images_gallery_wrapper}>
      <div className={styles.images_wrapper}>
        {images &&
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
                border: draggedIndex === index ? "5px solid #df791a" : "none",
                backgroundColor:
                  dragOverIndex === index ? "lightgray" : "white",
                scale: dragOverIndex === index ? "1.05" : "1",
                cursor: "pointer",
              }}
            >
              <ImageItem field={imgField} type={"gallery"} image={image} />
            </div>
          ))}
      </div>

      <div className={styles.drag_and_drop}>
        <DragAndDrop field={imgField} type="gallery" path={path} />
      </div>
    </div>
  );
};

export default ImagesGallery;
