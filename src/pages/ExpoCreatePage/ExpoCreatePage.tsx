import React, { useRef, useEffect, useState } from 'react';
import styles from './ExpoCreatePage.module.css'
import { BtnGroupSelect } from "../../components/ButtonGroup/ButtonGroup";
import { FillForm } from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import { InfoComponent } from "../../components/InfoComponent/InfoComponent";
import errorIcon from '../../assets/icons/Icon9.svg'
import Preview from '../../components/PreviewComponent/Preview';
import { ButtonArt } from '../../components/ButtonArt/ButtonArt';
import { ExpoCreateMainPage } from './ExpoCreateMainForm.tsx/ExpoCreateMainForm';
import { ExpoCreateExhibitsPage } from './ExpoCreateExhibits/ExpoCreateExhibits';



const btnData = [
    { name: "Главная", lable: 'mainScreen' },
    { name: "Экспонаты", lable: 'exhibits' },
    { name: "Карта", lable: 'map' },
    { name: "Настройки", lable: 'settings' },
];


export const ExpoCreatePage: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeBtn, setActiveBtn] = useState<string | number | number[]>('mainScreen')
    const handleActiveBtn = (lable: string | number | number[]) => {
        setActiveBtn(lable)
    }
    const contentComponent = () => {
        switch (activeBtn) {
            case 'mainScreen':
                return <ExpoCreateMainPage />
            case 'exhibits':
                return <ExpoCreateExhibitsPage/>
            default:
              
        }

    }

    useEffect(() => {
        const handleScroll = () => {
            setTimeout(() => {

                if (containerRef.current) {
                    containerRef.current.style.transform = `translateY(${window.scrollY}px)`;
                }
            }, 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])



    return (
        <div className={styles.ExpoCreateWrapper}>
            <div className={styles.InfoWrapper}>
                <div className={styles.toolbar_wrapper}>
                    <BtnGroupSelect handleActiveBtn={handleActiveBtn} view={'radio'} data={btnData} />
                    <div className={styles.toolbar__main_submint_btn_container}>
                        <ButtonArt  >Сохранить событие</ButtonArt>
                    </div>
                </div>
                <div className={styles.content_wrapper}>
                    {
                        contentComponent()
                    }
                </div>
            </div>
            <div ref={containerRef} className={styles.preview_wrapper} style={{}}>
                <div className={styles.preview__container}>
                    <div>
                        <h2>Предпросмотр</h2>
                    </div>
                    <Preview />
                </div>
                <div className={styles.InfoComponentWrapper}>
                    <InfoComponent title={'Не может быть опубликовано'} desc={'Есть незаполненные поля'}
                        icon={errorIcon} />
                </div>
            </div>
        </div>
    );
};