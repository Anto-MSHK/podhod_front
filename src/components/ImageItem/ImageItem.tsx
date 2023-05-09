import React, { useState } from "react";
import styles from "./ImageItem.module.css";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";
import {
	imageType,
	ImagesArrayType,
	SingleType,
	avatarExpoDeleteImg,
} from "../../app/Slices/imagesUploadSlice";
import { useAppDispatch } from "../../app/hooks";

interface IImageComponent {
	image: imageType;
	field: SingleType;
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
	const [modal, setModal] = useState(false);
	const dispatch = useAppDispatch();

	const toggle = () => {
		setModal(!modal);
	};

	const ImgHandler = {
		avatarExpo: avatarExpoDeleteImg,
	};

	return (
		<>
			<div onClick={() => toggle()}>
				<div
					className={styles.closeIcon}
					onClick={() => {
						dispatch(ImgHandler[field](`/img/${image.id}`));
					}}
				/>
				<img
					className={className ? className : styles.image}
					src={image.path}
					style={{ cursor: "pointer", ...style }}
					alt=""
				/>
			</div>
			<Modal
				backdrop={true}
				className={styles.modal_image_wrapper}
				isOpen={modal}
			>
				<ModalHeader toggle={toggle}>
					<h3>{image.description}</h3>
				</ModalHeader>
				<ModalBody draggable={false} className={styles.modal_image_container}>
					<img className={styles.modal_image} src={image.path} />
				</ModalBody>
				<ModalFooter>
					<Button
						color="secondary"
						onClick={() => dispatch(ImgHandler[field](`/img/${image.id}`))}
					>
						<p>Удалить изображение</p>
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default ImageItem;
