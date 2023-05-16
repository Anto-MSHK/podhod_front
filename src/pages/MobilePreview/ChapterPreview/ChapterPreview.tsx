import React, { FC, useEffect } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import nextArrow from '../../../assets/icons/nextArrow.svg'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from './ChapterPreview.module.css'
import { TextBox } from "../../../components/TextBox/TextBox";
import { EventPagesT } from "../../../app/Types/EventPageT";
import { clearSelectedPage } from "../../../app/Slices/SelectedPageSlice";
import { useDispatch } from "react-redux";


interface IchapterPage {
	data?: EventPagesT | null;
}

export const ChapterPreview: FC<IchapterPage> = ({data}) => {

	const dispatch = useDispatch();

	useEffect(() => {
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
				<Head leftElement={<h3>{data ? data.name : 'Выберите страницу'}</h3>}
							centerElement={' '}
							isTransparent={false}
							style={{backgroundColor: 'var(--blue_color)', width: '100%', borderRadius: '10px 10px 0 0'}}
				/>
			</div>
			<div className={styles.chapterPreview_content}>
				<TextBox data={pageData} />
			</div>
			<div className={styles.chapterPreview_bottom}>
				{data &&
				<BottomMenu style={{borderRadius: 'var(--radius)'}}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h3>Опубликовано</h3>
							</div>
							<div>
								<h5 style={{color: 'gray'}}>
									{
										new Date(data.updatedAt).toLocaleString('ru', { day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/[,\.]/g, ' ').replace(/(\d{4})\s/, '$1.').replace(/\s/g, '.')
									}
								</h5>
							</div>
						</div>
						<div className={styles.bottom_rightContainer}>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={nextArrow} onClick={() => console.log("Clicked")} /></div>
						</div>
					</div>
				</BottomMenu>
				}
			</div>
		</div>
	);
};