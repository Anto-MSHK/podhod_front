import React, { useRef, useEffect, useState  } from 'react';
import styles from './ExpoCreatePage.module.css'
import { BtnGroupSelect } from "../../components/ButtonGroup/ButtonGroup";
import { FillForm } from "../../components/FillForm/FillForm";
import ImagesGallery from "../../components/ImagesGallery/imagesGallery";
import { InfoComponent } from "../../components/InfoComponent/InfoComponent";
import errorIcon from '../../assets/icons/Icon9.svg'
import Preview from '../../components/PreviewComponent/Preview';



const btnData = [
    { name: "Главный экран", lable: 'mainScreen' },
    { name: "Экспонаты", lable: 'exhibits' },
    { name: "Карта", lable: 'map' },
    { name: "Настройки", lable: 'settings' },
];


export const ExpoCreatePage: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [activeBtn, setActiveBtn] = useState<string | number| number[]>()
    const handleActiveBtn = (lable: string | number | number[]) => {
        setActiveBtn(lable)
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
            {
                JSON.stringify(console.log(activeBtn))
            }
            <div className={styles.InfoWrapper}>
                <BtnGroupSelect handleActiveBtn={handleActiveBtn} view={'radio'} data={btnData} />
                <div className={styles.FormWrapper}>
                    <div>
                        <FillForm />
                    </div>
                    <div className={styles.ImgGalleryWrapper}>
                        <div className={styles.ImgGalleryTitle}>
                            <h3>Галерея</h3>
                            <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                        </div>
                        <ImagesGallery type='galleryImages' />
                    </div>
                    <div className={styles.ImgGalleryWrapper}>
                        <div className={styles.ImgGalleryTitle}>
                            <h3>Задний фон</h3>
                            <p>Изображения должны иметь размер до 2 мб и соотношение сторон 3 : 2</p>
                        </div>
                        <ImagesGallery type='backGroundImages' />
                    </div>
                   
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