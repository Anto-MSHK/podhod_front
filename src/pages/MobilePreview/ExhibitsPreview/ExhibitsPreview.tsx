import React, { FC, useEffect } from "react";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import styles from './ExhibitsPreview.module.css'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import { Gallery } from "../../../components/Gallery/Gallery";
import Head from "../../../components/Head/Head";
import backArrow from "../../../assets/icons/backArrow.svg";
import { TextBox } from "../../../components/TextBox/TextBox";
import { exhibitsT } from "../../../app/Types/ExhibitsT";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedExhibit, selectNextExhibit, setExhibits } from '../../../app/Slices/SelectedExhibitSlice';
import { useAppDispatch } from "../../../app/hooks";
import { useFetchExhibitsQuery } from "../../../app/services/ExhibitsApi";
import { useParams } from "react-router-dom";

const images = [
	{
		src: "data:image/png;base64,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",
		alt: "Image 1",
	},
	]

interface IChapterPage {
	data?: exhibitsT | null;
}

export const ExhibitsPreview: FC<IChapterPage> = ({data}) => {

	const { id: eventId } = useParams();
	const dispatch = useAppDispatch();
	const { data: exhibits, error, isLoading } = useFetchExhibitsQuery(eventId);
	const nextExhibit = useSelector(selectNextExhibit);

	useEffect(() => {
		if (exhibits) {
			dispatch(setExhibits(exhibits));
			dispatch(clearSelectedExhibit());
		}
	}, [exhibits, dispatch]);


	const ExhibitData = {
		title: data?.name,
		shortDesc: data?.short,
		desc: data?.description

	}



	return (
		<div className={styles.chapterPreview_wrapper}>
			<div className={styles.chapterPreview_head}>
				<Head leftElement={<div style={{ width: "35px", height: '35px' }}><ButtonArt round icon={backArrow} onClick={() => console.log('clicked')} /></div>}
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
								<h5>Далее: {nextExhibit?.name}</h5>
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