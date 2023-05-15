import React, { FC, useEffect } from "react";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import styles from "./ExhibitsPreview.module.css";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import { Gallery, ImageProps } from "../../../components/Gallery/Gallery";
import Head from "../../../components/Head/Head";
import backArrow from "../../../assets/icons/backArrow.svg";
import { TextBox } from "../../../components/TextBox/TextBox";
import { exhibitsT } from "../../../app/Types/ExhibitsT";
import { useSelector } from "react-redux";
import { clearSelectedExhibit, selectNextExhibit, setExhibits } from "../../../app/Slices/SelectedExhibitSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useFetchExhibitsQuery } from "../../../app/services/ExhibitsApi";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../app/http";

interface IChapterPage {
	data?: exhibitsT | null;
}

export const ExhibitsPreview: FC<IChapterPage> = ({ data }) => {

	const { id: eventId } = useParams();
	const dispatch = useAppDispatch();
	const { data: exhibits, error, isLoading, refetch } = useFetchExhibitsQuery(eventId);
	const nextExhibit = useSelector(selectNextExhibit);

	useEffect(() => {
		if (exhibits) {
			refetch();
			dispatch(setExhibits(exhibits));
			dispatch(clearSelectedExhibit());
		}
	}, [exhibits, dispatch]);


	const ExhibitData = {
		title: data?.name,
		shortDesc: data?.short,
		desc: data?.description,
	};

	const exhibitImages = (nextExhibit?.imgs?.map((img) => ({
		src: `${API_URL}/${img.path}`,
		alt: img.id,
	})) ?? []) as ImageProps[];

	/*	const sortedExhibitImages = (exhibitImages ?? [])
			.sort((a, b) => parseInt(a.alt) - parseInt(b.alt))
			.map((img) => ({
				src: `${img.src}`,
				alt: img.alt,
			})) as ImageProps[];*/

	const firstImage = exhibitImages.slice(0, 1);


	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_head}>
				<Head leftElement={<div style={{ width: "35px", height: "35px" }}><ButtonArt round icon={backArrow}
																																										 onClick={() => console.log("Clicked")} />
				</div>}
							centerElement={<h3>{data ? " " : "Выберите экспонат"}</h3>}
							isTransparent={true}
							style={{ width: "100%" }}
				/>
			</div>
			<div className={styles.chapterPreview_content}>
				<TextBox data={ExhibitData} />
			</div>
			<div className={styles.chapterPreview_bottom}>
				<BottomMenu style={{ borderRadius: "var(--radius)" }}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h5>Далее: {nextExhibit?.name}</h5>
							</div>
							<div style={{ width: "100%", height: "50px" }}>
								<ButtonArt text={"Перейти"} arrow />
							</div>
						</div>
						<div>
							{firstImage.length !== 0 &&
								<div className={styles.bottom_rightContainer}>
									<Gallery images={firstImage} isDisabled={true} />
								</div>
							}
						</div>
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};