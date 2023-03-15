import React, { useState } from "react";
import styles from "./dragAndDrop.module.css";
import addFileIcon from "../../assets/icons/addFileIcon.svg";
import { useAppDispatch } from "../../app/hooks";
import {
  ImagesArrayType,
  SingleType,
  uploadEventImg,
} from "../../app/Slices/imagesUploadSlice";
import { read } from "fs";
import { Input } from "reactstrap";
import { $api } from "../../app/http";

interface IDragAndDrop {
  type: "gallery" | "single";
  field: ImagesArrayType | SingleType;
  path: string;
  text?: string;
}

const DragAndDrop: React.FC<IDragAndDrop> = ({ type, field, text, path }) => {
  const [drag, setDrag] = useState(false);
  const dispatch = useAppDispatch();

  window.document.addEventListener("drag", function (event) {
    event.preventDefault();
  });

  const processImages = (images: FileList) => {
    Array.from(images).forEach((image) => {
      const formData = new FormData();
      formData.append("img", image);
      formData.append("description", "Это главное изображение события");
      dispatch(uploadEventImg({ path, formData }));
      const reader = new FileReader();
      reader.readAsDataURL(image);
    });
  };

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const dropHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files) {
      processImages(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      processImages(e.target.files);
    }
  };

  return (
    <div className={styles.drag_and_drop_wrapper}>
      {drag ? (
        <div
          className={styles.drag_and_drop_area}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => dropHandler(e)}
        >
          <p>Отпустите файл</p>
        </div>
      ) : (
        <div
          className={styles.drag_and_drop_area}
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
        >
          <Input
            type="file"
            multiple
            onChange={handleChange}
            className={styles.file_input}
            accept="image/*,.png,.jpg,.web,"
          />
          <img className={styles.icon} src={addFileIcon} />
          <p>{!text ? "Добавить изображение" : text}</p>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;
