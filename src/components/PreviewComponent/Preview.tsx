import React, { useState, useEffect } from "react";
import styles from "./Preview.module.css";
import { useAppSelector } from "../../app/hooks";
import { imageType } from "../../app/Slices/imagesUploadSlice";
import { PreviewSwitcher } from "../PreviewSwitcher/PreviewSwitcher";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { EventT } from "../../app/Types/EventsT";

interface IPreview {
	backgroundImg?: imageType;
	selectedPageType: string;
}

const Preview: React.FC<IPreview> = ({ backgroundImg, selectedPageType}) => {
	const [prevSelectedPageType, setPrevSelectedPageType] = useState(selectedPageType);

	useEffect(() => {
		setPrevSelectedPageType(selectedPageType);
	}, [selectedPageType]);

	const isForward = () => {
		const pagesOrder = ["EventPreview", "PagesPreview", "ExhibitsPreview"];
		return (
			pagesOrder.indexOf(selectedPageType) > pagesOrder.indexOf(prevSelectedPageType)
		);
	};

	return (
		<div
			className={styles.preview_picture}
			style={
				selectedPageType === "EventPreview" || "PagesPreview"
					? {
						backgroundImage: backgroundImg
							? `linear-gradient(0deg, rgba(0,0,0,1) 20%, rgba(0,212,255,0) 100%),  url(${backgroundImg.path})`
							: "none",
					}
					: { backgroundImage: "none" }
			}
		>
			<TransitionGroup className={`${styles.transitionGroup} ${isForward() ? styles.forward : styles.backward}`}>
				<CSSTransition
					key={selectedPageType}
					timeout={300}
					classNames={{
						enter: styles.slideEnter,
						enterActive: styles.slideEnterActive,
						exit: styles.slideExit,
						exitActive: styles.slideExitActive,
					}}
				>
					<PreviewSwitcher selectedPageType={selectedPageType}  />
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
};

export default Preview;
