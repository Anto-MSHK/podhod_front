import React, { useState } from "react";
import styles from "./dragAndDrop.module.css";
import addFileIcon from "../../assets/icons/addFileIcon.svg";
import { useAppDispatch } from "../../app/hooks";
import {
  setGallery,
  ImagesArrayType,
  SingleType,
  setSingle,
} from "../../app/Slices/imagesUploadSlice";
import { read } from "fs";
import { Input } from "reactstrap";

interface IDragAndDrop {
  type: "gallery" | "single";
  field: ImagesArrayType | SingleType;
  text?: string;
}

const DragAndDrop: React.FC<IDragAndDrop> = ({ type, field, text }) => {
  const [drag, setDrag] = useState(false);
  const dispatch = useAppDispatch();

  window.document.addEventListener("drag", function (event) {
    event.preventDefault();
  });

  const processImages = (images: FileList) => {
    Array.from(images).forEach((image) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        if (type === "gallery")
          dispatch(
            setGallery({
              image: {
                id: Date.now().toString(),
                name: image.name,
                lastModified: image.lastModified,
                size: image.size,
                url: reader.result as string,
              },
              key: field as ImagesArrayType,
            })
          );
        else {
          dispatch(
            setSingle({
              image: {
                id: Date.now().toString(),
                name: image.name,
                lastModified: image.lastModified,
                size: image.size,
                url: reader.result as string,
              },
              key: field as SingleType,
            })
          );
        }
      };
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
