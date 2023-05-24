import React, { FC, useEffect, useState } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import moreButton from "../../../assets/icons/MoreButton.svg";
import mapMarker from '../../../assets/icons/MapMarker.svg'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from './ChapterPreview.module.css'
import { TextBox } from "../../../components/TextBox/TextBox";
import { clearSelectedPage } from "../../../app/Slices/SelectedPageSlice";
import { useDispatch } from "react-redux";
import { exhibitsT } from '../../../app/Types/ExhibitsT'
import { ChapterT } from "../../../app/Types/ChapterT";
import { TextBlock } from "../../../components/TextBlock/TextBlock";
import { Gallery } from "../../../components/Gallery/Gallery";
import { API_URL } from "../../../app/http";
import { Simulate } from "react-dom/test-utils";
import toggle = Simulate.toggle;
import { toggleChapter } from "../../../app/Slices/isChapterShownSlice";


interface IchapterPage {
	data?: ChapterT | null;
	exhibit: exhibitsT | null;
}

export const ChapterPreview: FC<IchapterPage> = ({data, exhibit}) => {

	const dispatch = useDispatch();
	const [randomColor, setRandomColor] = useState("");

	useEffect(() => {
		const colors = ['var(--blue_color)', 'var(--orange_color)', 'var(--green_color)'];
		setRandomColor(colors[Math.floor(Math.random() * colors.length)]);

		return () => {
			dispatch(clearSelectedPage());
		};
	}, [dispatch]);

	const pageData = {
		desc: data?.description
	}

	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_head}>
				<Head leftElement={<div style={{width: '40px', height: '40px'}}><ButtonArt icon={backArrow} round onClick={() => dispatch(toggleChapter(data?.id))}/></div>}
							centerElement={<h3>{data ? data.title : 'Глава не найдена'}</h3>}
							isTransparent={false}
							style={{backgroundColor: randomColor, width: '100%', borderRadius: '10px 10px 0 0'}}
				/>
			</div>
			<div className={styles.chapterPreview_content}>
				{
					data?.blocks.length === 0 && <h3>Здесь пока ничего нет</h3>
				}
				{
					data?.blocks.map(block => {
						if (block.type === 'text') {
							return <TextBlock title={block.title} description={block.textBlock.description} />
						}
						else if (block.type === 'img') {
							const images = block.imgBlock.imgs.map(img => ({
								src: `${API_URL}/${img.path}`,
								alt: img.id.toString(),
							}));
							return (
								<div>
									<h3>{images.length > 0 && block.title}</h3>
									<Gallery images={images} isDisabled={true} />
								</div>
							)
						}
					})
				}
			</div>
			<div className={styles.chapterPreview_bottom}>
				<BottomMenu style={{borderRadius: 'var(--radius)'}}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h4>
									{exhibit?.name}
								</h4>
							</div>
							<div>
								<h5 style={{color: 'gray'}}>
									{exhibit?.short}
								</h5>
							</div>
						</div>
						<div className={styles.bottom_rightContainer}>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={moreButton} onClick={() => console.log("Clicked")} /></div>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={mapMarker} onClick={() => console.log("Clicked")} /></div>
						</div>
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};