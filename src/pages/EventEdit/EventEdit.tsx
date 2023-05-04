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

const btnData = [
	{ name: "Основная информация", lable: "mainScreen", type: "EventPage" },
	{
		name: "Страницы",
		lable: "pages",
		type: "ChapterPage",
	},
	{ name: "Экспонаты", lable: "exhibits", type: "ExhibitPage" },
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
				return null;
		}
	};

	const [selectedPageType, setSelectedPageType] = useState<string>("EventPage");

	useEffect(() => {
		if (typeof activeBtn === "number") {
			setSelectedPageType(btnData[activeBtn]?.type || "EventPage");
		}
	}, [activeBtn]);

	const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
		setDragStartX(e.clientX);
	};

	const handleDragMove = (e: React.MouseEvent) => {
		if (dragStartX === null) return;
		const dragOffset = e.clientX - dragStartX;

		if (dragOffset < -50) {
			const newActiveBtn = (activeBtn as number ?? 0) + 1;
			setActiveBtn(newActiveBtn > 3 ? 0 : newActiveBtn);
			setDragStartX(null);
		} else if (dragOffset > 50) {
			const newActiveBtn = (activeBtn as number ?? 0) - 1;
			setActiveBtn(newActiveBtn < 0 ? 3 : newActiveBtn);
			setDragStartX(null);
		}
	};

	const handleDragEnd = () => {
		setDragStartX(null);
	};

	return (
		<div>
			{(!isLoading && event) || !id ? (
				<div className={styles.expo_create_wrapper}>
					<div className={styles.expo_create__content}>
						<div className={styles.content__header_container}>
							{id && (
								<ImageSingle
									imgField="avatarExpo"
									textButton={"добавьте фото "}
									path={`/img/to/event/${event?.id}`}
									isLoading={isImgLoading}
									description="Это главное изображение события"
								/>
							)}

							<div className={styles.header__info_container}>
								<h1 style={{ margin: "0 0 -15px 0", fontWeight: 700 }}>
									<p
										className="min"
										style={{ margin: 0, fontSize: 20, fontWeight: 600 }}
									>
										{(typesEvent as any)[`${eventSlice?.eventType}`]}
									</p>
									{event && event.name
										? `«${eventSlice?.eventName}»`
										: "Создайте новое мероприятие"}
								</h1>
								<div className={styles.info__toolbar_container}>
									<CustomBtnGroup
										handleActiveBtn={handleActiveBtn}
										view={"radio"}
										data={btnData}
										activeBtn={activeBtn as number}
									/>
								</div>
							</div>
						</div>
						<div
							style={{
								margin: "30px 0 15px 0",
								background: "#DF791A",
								height: 2,
								borderRadius: 10,
								overflow: "hidden",
							}}
						/>
						<div className={styles.content_wrapper}>{handleActivePage()}</div>
					</div>
					<div ref={containerRef} className={styles.preview_wrapper} style={{}}>
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
							<Preview backgroundImg={backgroundImage} selectedPageType={selectedPageType} />
						</div>
						<div className={styles.InfoComponentWrapper}>
							<InfoMessage
								style={{ padding: "1rem" }}
								title={"Не может быть опубликовано"}
								desc={"Есть незаполненные поля"}
								icon={errorIcon}
							/>
						</div>
					</div>
				</div>
			) : (
				<LoadingScreen isLoading={isLoading} />
			)}
		</div>
	);
};
