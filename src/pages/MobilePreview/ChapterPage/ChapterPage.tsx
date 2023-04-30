import React from "react";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import styles from './ChapterPage.module.css'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import { Gallery } from "../../../components/Gallery/Gallery";
import { ImageSingle } from "../../../components/ImageSingle/ImageSingle";

const images = [
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zunge_raus.JPG/80px-Zunge_raus.JPG",
		alt: "Image 1",
	},
	]

export const ChapterPage = () => {
	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_content}>
				<h1>2</h1>
			</div>
			<div className={styles.chapterPreview_bottom}>
				<BottomMenu style={{borderRadius: 'var(--radius)'}}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h5>Далее: Луноход-1</h5>
							</div>
							<div style={{width: '100%', height: '50px'}}>
								<ButtonArt text={'Перейти'} arrow />
							</div>
						</div>
						<div>
							{/* <div className={styles.bottom_rightContainer}>
								<Gallery images={images} isDisabled={true} />
							</div> */}
						</div>
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};