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
	description?: string;
	style?: React.CSSProperties | undefined;
}

export const ImageSingle: React.FC<ISingleImageUpload> = ({
	imgField,
	title,
	help,
	textButton,
	path,
	isLoading,
	description,
	style,
}) => {
	const { id } = useParams();
	const image = useAppSelector(state => state.images[imgField]);

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
				<div
					className={styles.drag_and_drop}
					style={{ position: "relative", width: 0 }}
				>
					{image && !isLoading ? (
						<ImageItem
							field={imgField}
							type="single"
							image={image}
							className={styles.img}
							style={style}
						/>
					) : !isLoading || !id ? (
						<div className={styles.drag_and_drop_container} style={style}>
							<DragAndDrop
								field={imgField}
								description={description || ""}
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
