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
import { API_URL } from "../../../app/http";

interface IExhibitPage {
	data?: EventPagesT | null;
	setActiveBtn: React.Dispatch<React.SetStateAction<string | number | number[] | null>>
}

export const PagesPreview: FC<IExhibitPage> = ({ data , setActiveBtn}) => {

	const images = data && data.imgs?.map(img => ({
		src: `${API_URL}/${img.path}`,
		caption: img.description,
	}));


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
											 onClick={() => setActiveBtn(0)}
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
				{data && images && images.length > 0 ? (
					<BottomMenu
						gallery={
							<Gallery
								images={images}
								scrollLocked={false}
								className="gallery"
							/>
						}
					/>
				) : data ? (
					<BottomMenu><h3>Здесь пока нет изображений</h3></BottomMenu>
				) : ('')}
			</div>
		</div>
	);
};