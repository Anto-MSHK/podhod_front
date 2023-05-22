import React, { useState } from "react";
import styles from "./ImageItem.module.css";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
	imageType,
	ImagesArrayType,
	SingleType,
	avatarExpoDeleteImg,
	imgBlockDeleteImg, uploadPageImgDelete
} from "../../app/Slices/imagesUploadSlice";
import { useAppDispatch } from "../../app/hooks";

interface IImageComponent {
	image: imageType;
	field: SingleType | ImagesArrayType;
	type: "gallery" | "single";
	className?: string;
	style?: React.CSSProperties | undefined;
}

const ImageItem: React.FC<IImageComponent> = ({
	image,
	type,
	field,
	className,
	style,
}) => {
	const dispatch = useAppDispatch();

	const ImgHandler = {
		avatarExpo: avatarExpoDeleteImg,
		galleryImgBlock: imgBlockDeleteImg,
		galleryPageImgs: uploadPageImgDelete,
	};

	return (
		<>
			<div>
				<div
					className={styles.closeIcon}
					onClick={() => dispatch(ImgHandler[field](`/img/${image.id}`))}
				/>
				<img
					className={className ? className : styles.image}
					src={image.path}
					style={{...style }}
					alt=""
				/>
			</div>
		</>
	);
};

export default ImageItem;
