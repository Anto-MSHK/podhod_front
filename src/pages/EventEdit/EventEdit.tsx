import React, { useRef, useEffect, useState } from "react";
import styles from "./EventEdit.module.css";
import { CustomBtnGroup } from "../../components/CustomBtnGroup/CustomBtnGroup";
import errorIcon from "../../assets/icons/RedCircleWithCross.svg";
import Preview from "../../components/PreviewComponent/Preview";
import { EventShowpiecesEdit } from "../../components/EventShowpiecesEdit/EventShowpiecesEdit";
import { useParams } from "react-router-dom";
import { useFetchEventQuery } from "../../app/services/EventsApi";
import { setEvent } from "../../app/Slices/ExpoCreateSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { ImageSingle } from "../../components/ImageSingle/ImageSingle";
import { getEventImg } from "../../app/Slices/imagesUploadSlice";
import { EventPageEdit } from "../../components/EventPageEdit/EventPageEdit";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { EventForm } from "../../components/EventForm/EventForm";

import { EventSettings } from "../../components/EventSettings/EventSettings";

import useScrollPosition from "../../features/hooks/useScrollPosition";
import useComponentSize from "../../features/hooks/useSize";

const btnData = [
	{ name: "Основная информация", lable: "mainScreen", type: "EventPreview" },
	{
		name: "Страницы",
		lable: "pages",
		type: "PagesPreview",
	},
	{ name: "Экспонаты", lable: "exhibits", type: "ExhibitsPreview" },
	{ name: "Настройки", lable: "settings" },
];

const typesEvent = {
	exhibition: "выставка",
	fair: "ярмарка",
	"promo-exhibition": "промо-выставка",
};

export const EventEdit: React.FC = () => {
	const eventSlice = useAppSelector(state => state.eventCreate.event);
	const backgroundImage = useAppSelector(state => state.images.avatarExpo);
	const containerRef = useRef<HTMLDivElement>(null);
	const { id } = useParams();
	const { data: event, isLoading, isFetching } = useFetchEventQuery(id);
	const [activeBtn, setActiveBtn] =
		useState<string | number | number[] | null>(0);
	const [isImgLoading, setIsImgLoading] = useState(true);
	const dispatch = useAppDispatch();
	const [dragStartX, setDragStartX] = useState<number | null>(null);
	const handleActiveBtn = (btn: string | number | number[] | null) => {
		setActiveBtn(btn);
	};

	/*	useEffect(() => {
			const handleScroll = () => {
				setTimeout(() => {
					if (containerRef.current && window.scrollY > 90) {
						containerRef.current.style.transform = `translateY(${
							window.scrollY - 90
						}px)`;
					} else if (containerRef.current && window.scrollY < 90) {
						containerRef.current.style.transform = `translateY(0px)`;
					}
				}, 100);
			};
			window.addEventListener("scroll", handleScroll);
			return () => window.removeEventListener("scroll", handleScroll);
		}, []);*/

	useEffect(() => {
		if (event) {
			const values = {
				eventName: event.name,
				description: event.description,
				age: event.ageLimit,
				eventType: event.type,
			};
			dispatch(getEventImg(event.id)).then(() => {
				setIsImgLoading(false);
			});
			dispatch(setEvent(values));
		}
	}, [event]);

	const handleActivePage = () => {
		switch (activeBtn) {
			case 0:
				return <EventForm defaultData={event} />;
			case 1:
				return <EventPageEdit />;
			case 2:
				return <EventShowpiecesEdit />;
			case 3:
				return <EventSettings defaultScheduleData={event} />;
		}
	};

	const [selectedPageType, setSelectedPageType] =
		useState<string>("EventPreview");

	useEffect(() => {
		if (typeof activeBtn === "number") {
			setSelectedPageType(btnData[activeBtn]?.type || "EventPreview");
		}
	}, [activeBtn]);

	const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
		setDragStartX(e.clientX);
	};

	const handleDragMove = (e: React.MouseEvent) => {
		if (dragStartX === null) return;
		const dragOffset = e.clientX - dragStartX;

		if (dragOffset < -50) {
			const newActiveBtn = ((activeBtn as number) ?? 0) + 1;
			setActiveBtn(newActiveBtn > 2 ? 0 : newActiveBtn);
			setDragStartX(null);
		} else if (dragOffset > 50) {
			const newActiveBtn = ((activeBtn as number) ?? 0) - 1;
			setActiveBtn(newActiveBtn < 0 ? 2 : newActiveBtn);
			setDragStartX(null);
		}
	};

	const handleDragEnd = () => {
		setDragStartX(null);
	};

	const scroll = useScrollPosition();

	const LIMIT = 70;
	const HIGH_SCROLL = scroll > LIMIT;
	const LOW_SCROLL = scroll <= LIMIT;
	const [ref, size] = useComponentSize();
	return (
		<div>
			{(!isLoading && event) || !id ? (
				<div className={styles.expo_create_wrapper} style={{ marginTop: 20 }}>
					<div className={styles.expo_create__content}>
						<div
							className={styles.content__header_container}
							style={{ position: "relative" }}
						>
							<div
								style={{
									opacity: 1 - (scroll * 1.5) / 100,
								}}
							>
								{id && (
									<ImageSingle
										imgField="avatarExpo"
										textButton={"добавьте фото "}
										path={`/img/to/event/${event?.id}`}
										isLoading={isImgLoading}
										description="Это главное изображение события"
										style={{
											width: 275 - scroll,
											height: 150 - scroll,
										}}
									/>
								)}
							</div>
							<div
								className={styles.header__info_container}
								style={{
									display: "flex",
									flexDirection: HIGH_SCROLL ? undefined : "column",
									marginLeft:
										LOW_SCROLL && id ? 295 - scroll * 1 : 295 - LIMIT * 4,
									marginTop: HIGH_SCROLL ? 55 : undefined,
									marginBottom: !id ? -15 : undefined,
								}}
								ref={ref as any}
							>
								<h1
									style={{
										width: "70%",
										margin: `0 0 ${HIGH_SCROLL ? 0 : -30}px 0`,
										fontWeight: 700,
										fontSize: LOW_SCROLL ? 42 - scroll / 5 : 42 - LIMIT / 5,
									}}
								>
									<p
										className="min"
										style={{ margin: 0, fontSize: 20, fontWeight: 600 }}
									>
										{(typesEvent as any)[`${eventSlice?.eventType}`]}
									</p>
									{event && event.name
										? `«${eventSlice?.eventName}»`
										: (
											<div className={styles.createEventSign_wrapper}>
												<div className={styles.createEvent_title}>Создайте новое мероприятие</div>
												<div className={styles.createEvent_hint}>После создания вам будет доступна полная версия редактора</div>
											</div>
										)}
								</h1>
								<div
									className={styles.info__toolbar_container}
									style={{
										justifyContent: LOW_SCROLL ? undefined : "end",
										alignItems: "center",
									}}
								>
									{event && (
										<CustomBtnGroup
											handleActiveBtn={handleActiveBtn}
											view={"radio"}
											data={btnData}
											activeBtn={activeBtn as number}
										/>
									)}
								</div>
							</div>
						</div>
						<div
							style={{
								margin: `20px 0 15px 0`,
								background: "#DF791A",
								height: 2,
								borderRadius: 10,
								overflow: "hidden",
							}}
						/>
						<div className={styles.content_wrapper}>{handleActivePage()}</div>
					</div>
					<div ref={containerRef} className={styles.preview_wrapper} style={{}}>
						{event && activeBtn !== 3 && (
							<div>
								<div>
									<h3 style={{ margin: "0 0 10px 0", textAlign: "left" }}>
										Предпросмотр
									</h3>
								</div>

								<div
									className={styles.preview__container}
									onMouseDown={handleDragStart}
									onMouseMove={handleDragMove}
									onMouseUp={handleDragEnd}
								>
									<Preview
										backgroundImg={backgroundImage}
										selectedPageType={selectedPageType}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			) : (
				<LoadingScreen isLoading={isLoading} />
			)}
		</div>
	);
};
