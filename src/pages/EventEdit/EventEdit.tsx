import React, { useRef, useEffect, useState } from "react";
import styles from "./EventEdit.module.css";
import { BtnGroupSelect } from "../../components/CustomBtnGroup/CustomBtnGroup";
import errorIcon from "../../assets/icons/RedCircleWithCross.svg";
import Preview from "../../components/PreviewComponent/Preview";
import { EventMainForm } from "./EventMain/EventMainForm";
import { EventCreateExhibits } from "./EventCreateExhibits/EventCreateExhibits";
import { useParams } from "react-router-dom";
import { useFetchEventQuery } from "../../app/services/EventsApi";
import { setEvent } from "../../app/Slices/ExpoCreateSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { ImageSingle } from "../../components/ImageSingle/ImageSingle";
import { getEventImg } from "../../app/Slices/imagesUploadSlice";
import { EventCreatePages } from './EventCreatePage/EventCreatePage';
import {InfoMessage} from "../../components/InfoMessage/InfoMessage";

const btnData = [
  { name: "Основная информация", lable: "mainScreen" },
  {
    name: "Страницы",
    lable: "pages",
    /*   splits: [{ title: "Дополнительная страница", label: "any" }], */
  },
  { name: "Экспонаты", lable: "exhibits" },
  { name: "Настройки", lable: "settings" },
];

const typesEvent = {
  exhibition: "выставка",
  fair: "ярмарка",
  "promo-exhibition": "промо-выставка",
};
export const EventEdit: React.FC = () => {

  const eventSlice = useAppSelector((state) => state.eventCreate.event);
  const backgroundImage = useAppSelector((state) => state.images.avatarExpo)
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { data: event, isLoading, isFetching } = useFetchEventQuery(id);
  const [activeBtn, setActiveBtn] = useState<string | number | number[]>("mainScreen");
  const handleActiveBtn = (lable: string | number | number[]) => {
    setActiveBtn(lable);
  };
  const [isImgLoading, setIsImgLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setTimeout(() => {
        if (containerRef.current && window.scrollY > 90) {
          containerRef.current.style.transform = `translateY(${window.scrollY - 90
            }px)`;
        } else if (containerRef.current && window.scrollY < 90) {
          containerRef.current.style.transform = `translateY(0px)`;
        }
      }, 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      case 'mainScreen':
        return <EventMainForm data={event} />
      case 'exhibits':
        return <EventCreateExhibits />
      case 'settings':
        return null
      case 'pages':
        return <EventCreatePages />
    }
  }

  return (
    <div>
      {(!isLoading && event) || !id ? (
        <div className={styles.expo_create_wrapper}>
          <div className={styles.expo_create__content}>
            <div className={styles.content__header_container} >
              {id && (
                <ImageSingle
                  imgField="avatarExpo"
                  textButton={"добавьте фото "}
                  path={`/img/to/event/${event?.id}`}
                  isLoading={isImgLoading}
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
                  <BtnGroupSelect
                    handleActiveBtn={handleActiveBtn}
                    view={"radio"}
                    data={btnData}
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
            <div className={styles.content_wrapper}>
              {handleActivePage()}
            </div>
          </div>
          <div ref={containerRef} className={styles.preview_wrapper} style={{}}>
            <div className={styles.preview__container}>
              <div>
                <h3 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
                  предпросмотр
                </h3>
              </div>
              <Preview backgroundImg={backgroundImage} />
            </div>
            <div className={styles.InfoComponentWrapper}>
              <InfoMessage
                title={"Не может быть опубликовано"}
                desc={"Есть незаполненные поля"}
                icon={errorIcon}
              />
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};
