import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DragAndDrop.module.css";
import addFileIcon from "../../assets/icons/addFileIcon.svg";
import { useAppDispatch } from "../../app/hooks";
import {
  ImagesArrayType,
  SingleType,
  uploadEventImg,
} from "../../app/Slices/imagesUploadSlice";

interface IDragAndDrop {
  type: "gallery" | "single";
  field: ImagesArrayType | SingleType;
  path: string;
  text?: string;
}

const DragAndDrop: React.FC<IDragAndDrop> = ({ type, field, text, path }) => {
  const dispatch = useAppDispatch();

  const processImages = useCallback(
    (images: File[]) => {
      images.forEach((image) => {
        const formData = new FormData();
        formData.append("img", image);
        formData.append("description", "Это главное изображение события");
        dispatch(uploadEventImg({ path, formData }));
      });
    },
    [dispatch, path]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      processImages(acceptedFiles);
    },
    [processImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
  });

  return (
    <div className={styles.drag_and_drop_wrapper}>
      <div {...getRootProps()} className={styles.drag_and_drop_area}>
        <input {...getInputProps()} />
        <img className={styles.icon} src={addFileIcon} />
        <p>
          {!isDragActive
            ? !text
              ? "Добавить изображение"
              : text
            : "Отпустите файл"}
        </p>
      </div>
    </div>
  );
};

export default DragAndDrop;
