import React, { useState } from "react";
import styles from "./Preview.module.css";
import { useAppSelector } from "../../app/hooks";
import ImageItem from "../ImageItem/ImageItem";
import { imageType } from '../../app/Slices/imagesUploadSlice';

interface IPreview {
  backgroundImg?: imageType
}
const Preview: React.FC<IPreview> = ({backgroundImg}) => {
  console.log(backgroundImg);
  const event = useAppSelector((state) => state.eventCreate.event);
  const exhibit = useAppSelector((state) => state.exhibitCreate.exhibit);
  const galleryImages = useAppSelector((state) => state.images.galleryMainPage);
  return (
    <div
      className={styles.preview_picture}
      style={{
        backgroundImage:
        backgroundImg
            ? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 100%),  url(${backgroundImg.path})`
            : "none",
      }}
    >
      <div className={styles.preview_picture__header}>
        <div className={styles.preview_picture__age}>
          <p>{event?.age}</p>
        </div>
      </div>
      <div className={styles.preview_picture__content}>
        <div className={styles.preview_picture__event_name}>
          <h2>{event?.eventName}</h2>
        </div>
        <div className={styles.preview_picture__description}>
          <p>{event?.description}</p>
        </div>
      </div>
      <div className={styles.preview_images}>
        {galleryImages &&
          galleryImages.map((image) => (
            <div className={styles.preview_image_container}>
              <ImageItem
                image={image}
                type="gallery"
                field="galleryMainPage"
              />
            </div>
          ))}
      </div>
      <div className={styles.preview_picture__footer}>
        <div className={styles.preview_picture__move_btn}>
          <p>Перейти к выставке --{`>`}</p>
        </div>
      </div>
    </div>
  );
};
export default Preview;
