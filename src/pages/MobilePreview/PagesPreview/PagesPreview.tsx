import React, { FC, useEffect } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import crossIcon from '../../../assets/icons/BlackCrossInCircle.svg'
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from './PagesPreview.module.css'
import { TextBox } from "../../../components/TextBox/TextBox";
import { EventPagesT } from "../../../app/Types/EventPageT";
import { clearSelectedPage } from "../../../app/Slices/SelectedPageSlice";
import { useDispatch } from "react-redux";


interface IExhibitPage {
	data?: EventPagesT | null;
}

export const PagesPreview: FC<IExhibitPage> = ({data}) => {

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
		<div className={styles.exhibitPreview_wrapper}>
			<div className={styles.exhibitPreview_head}>
				<Head leftElement={<h3>{data ? data.name : 'Выберите страницу'}</h3>}
							centerElement={' '}
							isTransparent={false}
							style={{backgroundColor: 'var(--blue_color)', width: '100%', borderRadius: '10px 10px 0 0'}}
				/>
			</div>
			<div className={styles.exhibitPreview_content}>
				<TextBox data={pageData} />
			</div>
			<div className={styles.exhibitPreview_bottom}>
				<BottomMenu style={{borderRadius: 'var(--radius)'}}>
					<div className={styles.bottom_wrapper}>
						<div className={styles.bottom_leftContainer}>
							<div>
								<h3>Луноход 1</h3>
							</div>
							<div>
								<h5 style={{color: 'gray'}}>1970 год</h5>
							</div>
						</div>
						<div className={styles.bottom_rightContainer}>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={backArrow} onClick={() => console.log("Clicked")} /></div>
							<div style={{ width: "40px", height: '40px' }}><ButtonArt round icon={crossIcon} onClick={() => console.log("Clicked")} /></div>
						</div>
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};