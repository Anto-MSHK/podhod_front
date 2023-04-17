import React, { useState } from "react";
import styles from "./Preview.module.css";
import { useAppSelector } from "../../app/hooks";
import ImageItem from "../ImageItem/ImageItem";
import { imageType } from "../../app/Slices/imagesUploadSlice";
import { PreviewSwitcher } from "../PreviewSwitcher/PreviewSwitcher";

interface IPreview {
	backgroundImg?: imageType;
	selectedPageType: string;
}
const Preview: React.FC<IPreview> = ({ backgroundImg, selectedPageType }) => {
	const event = useAppSelector(state => state.eventCreate.event);
	const exhibit = useAppSelector(state => state.exhibitCreate.exhibit);
	const galleryImages = useAppSelector(state => state.images.galleryMainPage);

	return (
		<div
			className={styles.preview_picture}
			style={selectedPageType === 'EventPage' ? {
				backgroundImage: backgroundImg
					? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 100%),  url(${backgroundImg.path})`
					: "none",
			} : {backgroundImage: "none"}}
		>
			<PreviewSwitcher selectedPageType={selectedPageType} />
		</div>
	);
};
export default Preview;
