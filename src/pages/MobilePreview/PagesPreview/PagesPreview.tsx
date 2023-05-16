import React, { FC, useEffect, useState } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import nextArrow from "../../../assets/icons/nextArrow.svg";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from "./PagesPreview.module.css";
import { TextBox } from "../../../components/TextBox/TextBox";
import { EventPagesT } from "../../../app/Types/EventPageT";
import { clearSelectedPage, setPages } from "../../../app/Slices/SelectedPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFetchExhibitsQuery } from "../../../app/services/ExhibitsApi";
import { useFetchPageQuery } from "../../../app/services/EventPages.Api";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { clearSelectedExhibit, setExhibits } from "../../../app/Slices/SelectedExhibitSlice";
import { setPage } from "../../../app/Slices/ExpoCreatePageSlice";
import { Gallery } from "../../../components/Gallery/Gallery";
import imagesGallery from "../../../components/ImagesGallery/ImagesGallery";
import icon2 from "../../../assets/icons/Wallet.svg";

interface IExhibitPage {
	data?: EventPagesT | null;
}

export const PagesPreview: FC<IExhibitPage> = ({ data }) => {

	const images = [
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zunge_raus.JPG/80px-Zunge_raus.JPG",
			alt: "Image 1",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Manoel.jpg/275px-Manoel.jpg",
			alt: "Image 2",
		},
		{
			src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Manul_kitten.jpg/300px-Manul_kitten.jpg",
			alt: "Image 3",
		},
	];
	const { id: eventId } = useParams();
	const { data: pages, error, isLoading, refetch } = useFetchPageQuery(eventId);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (pages) {
			refetch();
			dispatch(setPages(pages));
			dispatch(clearSelectedPage());
		}
	}, [pages, dispatch]);

	const pageData = {
		title: data?.name,
		desc: data?.description,
	};

	return (
		<div className={styles.exhibitPreview_wrapper}>
			<div className={styles.exhibitPreview_head}>
				<Head
					leftElement={<div style={{ width: "35px", height: "35px" }}>
						<ButtonArt round icon={backArrow}
											 onClick={() => console.log("Clicked")}
						/>
					</div>}
					centerElement={<h3>{data ? " " : "Выберите страницу"}</h3>}
					isTransparent={true}
					style={{ width: "100%" }}
				/>
			</div>
			<div className={styles.exhibitPreview_content}>
				<TextBox data={pageData} />
			</div>
			<div className={styles.exhibitPreview_bottom}>
				{data && (
					<BottomMenu
						gallery={
							<Gallery
								images={images}
								scrollLocked={false}
								className="gallery"
							/>
						}
					/>
				)}
			</div>
		</div>
	);
};