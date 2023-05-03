import React, { FC, useEffect } from "react";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import styles from './ExhibitsPreview.module.css'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import { Gallery } from "../../../components/Gallery/Gallery";
import Head from "../../../components/Head/Head";
import backArrow from "../../../assets/icons/backArrow.svg";
import { TextBox } from "../../../components/TextBox/TextBox";
import { exhibitsT } from "../../../app/Types/ExhibitsT";
import { useDispatch } from "react-redux";
import { clearSelectedExhibit } from '../../../app/Slices/SelectedExhibitSlice';

const images = [
	{
		src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zunge_raus.JPG/80px-Zunge_raus.JPG",
		alt: "Image 1",
	},
	]

interface IChapterPage {
	data?: exhibitsT | null;
}

export const ExhibitsPreview: FC<IChapterPage> = ({data}) => {

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(clearSelectedExhibit());
		};
	}, [dispatch]);


	const ExhibitData = {
		title: data?.name,
		shortDesc: data?.short,
		desc: data?.description

	}



	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_head}>
				<Head leftElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>}
							centerElement={<h3>{data ? ' ' : 'Выберите экспонат'}</h3>}
							isTransparent={true}
							style={{width: '100%'}}
				/>
			</div>
			<div className={styles.chapterPreview_content}>
				<TextBox data={ExhibitData}/>
			</div>
			<div className={styles.chapterPreview_bottom}>
				<BottomMenu style={{borderRadius: 'var(--radius)'}}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h5>Далее:</h5>
							</div>
							<div style={{width: '100%', height: '50px'}}>
								<ButtonArt text={'Перейти'} arrow />
							</div>
						</div>
						<div>
							<div className={styles.bottom_rightContainer}>
								<Gallery images={images} isDisabled={true} />
							</div>
						</div>
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};