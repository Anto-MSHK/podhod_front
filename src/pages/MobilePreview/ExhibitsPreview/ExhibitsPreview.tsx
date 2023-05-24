import React, { FC, useEffect, useMemo, useState, useCallback } from "react";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import styles from "./ExhibitsPreview.module.css";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import { Gallery, ImageProps } from "../../../components/Gallery/Gallery";
import Head from "../../../components/Head/Head";
import backArrow from "../../../assets/icons/backArrow.svg";
import { TextBox } from "../../../components/TextBox/TextBox";
import { exhibitsT } from "../../../app/Types/ExhibitsT";
import { useSelector } from "react-redux";
import {
	clearSelectedExhibit,
	selectNextExhibit,
	setExhibits,
	setSelectedExhibit,
} from "../../../app/Slices/SelectedExhibitSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useFetchExhibitsQuery } from "../../../app/services/ExhibitsApi";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../app/http";
import { Slider } from "../../../components/Slider/Slider";
import { InfoTag } from "../../../components/InfoTag/InfoTag";
import { toggleChapter } from "../../../app/Slices/isChapterShownSlice";
import { ChapterT } from "../../../app/Types/ChapterT";

interface IChapterPage {
	data?: exhibitsT | null;
	setActiveBtn: React.Dispatch<React.SetStateAction<string | number | number[] | null>>
}
export interface ISliderImage {
	src: string;
	alt?: string | undefined;
	caption?: string | undefined;
}

export const ExhibitsPreview: FC<IChapterPage> = ({ data, setActiveBtn }) => {
	const { id: eventId } = useParams();
	const dispatch = useAppDispatch();
	const {
		data: exhibits,
		error,
		isLoading,
		refetch,
	} = useFetchExhibitsQuery(eventId);
	const nextExhibit = useSelector(selectNextExhibit);

	useEffect(() => {
		if (exhibits) {
			refetch().unwrap();
			dispatch(setExhibits(exhibits));
			// сhangeShowPiece(e.key);
			const selectedExhibit = exhibits.find(exhib => exhib.id === data?.id);
			dispatch(setSelectedExhibit(selectedExhibit || exhibits[0]));
			// dispatch(clearSelectedExhibit());
		}
	}, [exhibits, data]);

	const handleClick = (chapter: ChapterT) => {
		dispatch(toggleChapter(chapter.id));
	};

	const ExhibitData = {
		title: data?.name,
		shortDesc: data?.short,
		desc: data?.description,
		imgs: data?.imgs,
	};

	const blocksTag = useMemo(() => {
		return data?.chapters?.map((chapter, index) => {
			let colors = ['var(--orange_color)', 'var(--green_color)', "var(--blue_color)"];
			var randomIndex = Math.floor(Math.random() * colors.length);
			return (
				<InfoTag
					className={styles.chapter_tag}
					color={colors[randomIndex]}
					onClick={() => handleClick(chapter)}
					key={chapter.id}
					text={chapter.title}
					style={{ boxShadow: `0px 0px 15px 1px ${colors[randomIndex]}` }}
				/>
			);
		});
	}, [data]);

	const handleClickNextExhibit = () => {
		dispatch(setSelectedExhibit(nextExhibit));
	};

	const handleBlocksImgsList = useCallback(
		(exhibit?: exhibitsT | null) => {
			const sliderData: ISliderImage[] = [];
			exhibit?.chapters?.forEach(chapter => {
				chapter.blocks.forEach(block => {
					block.imgBlock?.imgs.forEach(img => {
						sliderData.push({
							src: `${API_URL}/${img.path}`,
							caption: img.description,
						});
					});
				});
			});
			return sliderData;
		},
		[nextExhibit, data],
	);
	const sliderImages = handleBlocksImgsList(data);
	const nextExhibitImgs = handleBlocksImgsList(nextExhibit);

	/*	const sortedExhibitImages = (exhibitImages ?? [])
			.sort((a, b) => parseInt(a.alt) - parseInt(b.alt))
			.map((img) => ({
				src: `${img.src}`,
				alt: img.alt,
		})) as ImageProps[];*/

	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_head}>
				<Head
					leftElement={
						<div style={{ width: "35px", height: "35px" }}>
							<ButtonArt
								round
								icon={backArrow}
								onClick={() => setActiveBtn(1)}
							/>
						</div>
					}
					centerElement={<h3>{data ? " " : "Выберите экспонат"}</h3>}
					isTransparent={true}
					style={{ width: "100%" }}
				/>
			</div>
			<div className={styles.chapterPreview_slider_container}>
				<Slider images={sliderImages} />
			</div>
			<div className={styles.chapterPreview_content}>
				<TextBox data={ExhibitData} />
				<h3>Больше интересного</h3>
				<div className={styles.chapterPreview_tags_container}>{blocksTag}</div>
			</div>

			<div className={styles.chapterPreview_bottom}>
				<BottomMenu style={{ borderRadius: "var(--radius)" }}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h5 style={{overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '150px'}}>Далее: {nextExhibit?.name}</h5>
							</div>
							<div
								onClick={() => handleClickNextExhibit()}
								style={{ width: "100%", height: "50px" }}
							>
								<ButtonArt text={"Перейти"} arrow />
							</div>
						</div>
						{nextExhibitImgs.length !== 0 && (
							<div className={styles.bottom_rightContainer}>
								<Gallery images={[nextExhibitImgs[0]]} isDisabled={true} />
							</div>
						)}
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};