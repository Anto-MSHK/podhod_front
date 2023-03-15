import React, { useRef, useEffect, useState } from "react";
import styles from "./ExpoCreatePage.module.css";
import { BtnGroupSelect } from "../../components/ButtonGroup/ButtonGroup";
import { MainInfoExpoForm } from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import { InfoComponent } from "../../components/InfoComponent/InfoComponent";
import errorIcon from "../../assets/icons/Icon9.svg";
import Preview from "../../components/PreviewComponent/Preview";
import { ButtonArt } from "../../components/ButtonArt/ButtonArt";
import { ExpoMainPage } from "./ExpoMainForm.tsx/ExpoCreateMainForm";
import { ExpoCreateExhibitsPage } from "./ExpoCreateExhibits/ExpoCreateExhibits";
import { useParams } from "react-router-dom";
import { useFetchEventQuery } from "../../app/services/EventsApi";
import { setEvent } from "../../app/Slices/ExpoCreateSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Placeholder, Spinner } from "reactstrap";
import { ManySpinner } from "../../components/Spinner/Spinner";
import { SingleImageUpload } from "../../components/SingleImageUpload/SingleImageUpload";
import { getEventImg } from "../../app/Slices/imagesUploadSlice";

const btnData = [
  { name: "Основная информация", lable: "mainScreen" },
  {
    name: "Главная страница",
    lable: "mainScreen",
    splits: [{ title: "Дополнительная страница", label: "any" }],
  },
  { name: "Экспонаты", lable: "exhibits" },
  { name: "Настройки", lable: "settings" },
];

const typesEvent = {
  exhibition: "выставка",
  fair: "ярмарка",
  "promo-exhibition": "промо-выставка",
};
export const ExpoCreatePage: React.FC = () => {
  const eventSlice = useAppSelector((state) => state.eventCreate.event);
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { data: event, isLoading } = useFetchEventQuery(id);
  const [activeBtn, setActiveBtn] =
    useState<string | number | number[]>("mainScreen");
  const handleActiveBtn = (lable: string | number | number[]) => {
    setActiveBtn(lable);
  };
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
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
  }, []);
  const dispatch = useAppDispatch();
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

  return (
    <div>
      {(!isLoading && event) || !id ? (
        <div className={styles.ExpoCreateWrapper}>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <SingleImageUpload
                imgField="avatarExpo"
                textButton={"добавьте фото "}
                path={`/img/to/event/${event?.id}`}
                isLoading={isImgLoading}
              />

              <div className={styles.InfoWrapper}>
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
                <div className={styles.toolbar_wrapper}>
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
              {activeBtn === "mainScreen" ? (
                <ExpoMainPage data={event} />
              ) : (
                <ExpoCreateExhibitsPage />
              )}
            </div>
          </div>
          <div ref={containerRef} className={styles.preview_wrapper} style={{}}>
            <div className={styles.preview__container}>
              <div>
                <h3 style={{ margin: "0 0 10px 0", textAlign: "center" }}>
                  предпросмотр
                </h3>
              </div>
              <Preview />
            </div>
            <div className={styles.InfoComponentWrapper}>
              <InfoComponent
                title={"Не может быть опубликовано"}
                desc={"Есть незаполненные поля"}
                icon={errorIcon}
              />
            </div>
          </div>
        </div>
      ) : (
        <ManySpinner />
      )}
    </div>
  );
};
