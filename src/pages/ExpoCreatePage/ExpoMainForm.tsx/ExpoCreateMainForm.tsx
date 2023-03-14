import React, { useRef, useEffect, useState } from "react";
import styles from "./ExpoCreateMainForm.module.css";
import { MainInfoExpoForm } from "../../../components/FillForm/FillForm";
import ImagesGallery from "../../../components/ImagesGallery/imagesGallery";
import { CreateEventPayloadT, EventT } from "../../../app/Types/EventsT";
import {
  useAddEventMutation,
  useFetchEventQuery,
} from "../../../app/services/EventsApi";
import { useAppDispatch } from "../../../app/hooks";
import { useParams } from "react-router-dom";

interface ExpoMainPageI {
  data: EventT | undefined;
}
export const ExpoMainPage: React.FC<ExpoMainPageI> = ({ data }) => {
  return (
    <div className={styles.main_page_form_wrapper}>
      <div>
        <MainInfoExpoForm defaultData={data} />
      </div>
      <h2>Медиа</h2>
      <div className={styles.media_wrapper}>
        <div className={styles.ImgGalleryWrapper}>
          <div className={styles.ImgGalleryTitle}>
            <h3>Галерея</h3>
            <p>
              Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2
            </p>
          </div>
          <ImagesGallery type="galleryImages" />
        </div>
        <div className={styles.ImgGalleryWrapper}>
          <div className={styles.ImgGalleryTitle}>
            <h3>Задний фон</h3>
            <p>
              Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2
            </p>
          </div>
          <ImagesGallery type="backGroundImages" />
        </div>
      </div>
    </div>
  );
};
