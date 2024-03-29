import React, { FC, useCallback, useEffect } from "react";
import Head from "../../../components/Head/Head";
import { ButtonArt } from "../../../components/ButtonArt/ButtonArt";
import backArrow from "../../../assets/icons/backArrow.svg";
import logoExample from "../../../assets/pictures/logoExample.png";
import { BottomMenu } from "../../../components/BottomMenu/BottomMenu";
import styles from "./EventPreview.module.css";
import { TextBox } from "../../../components/TextBox/TextBox";
import { eventForm } from "../../../app/Slices/ExpoCreateSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { API_URL } from "../../../app/http";
import { ISliderImage } from "../ExhibitsPreview/ExhibitsPreview";
import { Gallery } from "../../../components/Gallery/Gallery";
import { Slider } from "../../../components/Slider/Slider";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchExhibitsQuery } from "../../../app/services/ExhibitsApi";
import { setExhibits, setSelectedExhibit } from "../../../app/Slices/SelectedExhibitSlice";

interface IEventPage {
	data: eventForm | undefined;
}

export const EventPreview: FC<IEventPage> = ({ data }) => {
	type EventType = "exhibition" | "fair" | "promo-exhibition";
	const { id: eventId } = useParams();
	const dispatch = useAppDispatch();
	const {
		data: exhibits,
		refetch,
	} = useFetchExhibitsQuery(eventId);
	const navigate = useNavigate();
	useEffect(() => {
		if (exhibits) {
			refetch().unwrap();
			dispatch(setExhibits(exhibits));
			const selectedExhibit = exhibits.find(exhib => exhib.id === data?.id);
			dispatch(setSelectedExhibit(selectedExhibit || exhibits[0]));
		}
	}, [exhibits, data]);
	const handleBlocksImgsList = useCallback(() => {
		const sliderData: ISliderImage[] = [];
		exhibits && exhibits.forEach(exhibit => {
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
		});
		return sliderData;
	}, [data, exhibits]);
	const sliderImages = handleBlocksImgsList();

	const typesEvent: Record<EventType, string> = {
		exhibition: "Выставка",
		fair: "Ярмарка",
		"promo-exhibition": "Промо-выставка",
	};

	function isEventType(key: string): key is EventType {
		return key in typesEvent;
	}

	const eventData = {
		extra: (
			<h5>
				{data?.eventType && isEventType(data.eventType)
					? typesEvent[data.eventType]
					: null}
			</h5>
		),
		title: `"${
			data && data.eventName ? data.eventName : "Создайте новое мероприятие"
		}"`,
		desc: data?.description,
	};

	return (
		<div className={styles.eventPreview_wrapper}>
			<div className={styles.eventPreview_head}>
				<Head
					leftElement={
						<div style={{ width: "35px", height: "35px" }}>
							<ButtonArt
								round
								icon={backArrow}
								onClick={() => navigate('/')}
							/>
						</div>
					}
					centerElement={
						' '
					}
					rightElement={
						<div style={{ width: "35px", height: "35px" }}>
							<ButtonArt
								round
								text={data && data.age ? data.age : "?"}
								onClick={() => console.log('Clicked')}
							/>
						</div>
					}
					isTransparent={true}
					style={{ width: "100%" }}
				/>
			</div>
			<div className={styles.eventPreview_content}>
				<TextBox data={eventData} />
				<div className={styles.slider_container}>
					<Slider bordered images={sliderImages} />
				</div>
			</div>
			<div className={styles.eventPreview_bottom}>
				<BottomMenu style={{ backgroundColor: "transparent" }}>
					<div style={{ width: "100%" }}>
						<ButtonArt text={"Перейти к выставке"} arrow />
					</div>
				</BottomMenu>
			</div>
		</div>
	);
};
