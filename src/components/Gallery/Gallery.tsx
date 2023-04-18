import React, { useState, useCallback, useMemo, useEffect, useRef, RefObject } from 'react';
import styles from './Gallery.module.css';
import {CarouselIndicators} from 'reactstrap';

interface ImageProps {
    src: string;
    alt: string;
}

interface GalleryProps {
    images: ImageProps[];
    className?: string;
    scrollLocked?: boolean;
    indicators?: boolean

}

interface GalleryImageProps extends ImageProps {
    isActive: boolean;
    onClick: (index: number) => void;
    imageNumber: number;
    className?: string;

}

const GalleryImage: React.FC<GalleryImageProps> = React.memo(({ src, alt, isActive, onClick, imageNumber, className }) => {
    const handleClick = useCallback(() => {
        onClick(imageNumber - 1);
    }, [onClick, imageNumber]);

    return (
        <figure
            className={`${styles.imageWrapper} ${isActive ? styles.selected : ''} ${className}`}
            onClick={handleClick}
            aria-label={`Image ${imageNumber}`}
            role="button"
            tabIndex={0}
            data-isactive={isActive}
            id={`image-${imageNumber}`}
        >
            <img src={src} alt={alt} className={styles.image} />
        </figure>
    );
});

export const Gallery: React.FC<GalleryProps> = ({ images, className = '', scrollLocked = false, indicators }) => {
    const [activeIndex, setActiveIndex] = useState<number>(() => {
        const storedIndex = localStorage.getItem('activeIndex');
        return storedIndex !== null ? parseInt(storedIndex, 10) : -1;
    });


    const galleryRef = useRef(null)


    const handleImageClick = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => index === prevActiveIndex ? -1 : index);
    }, []);

    const handleCarouselIndicatorClick = useCallback((index: number) => {
        handleImageClick(index)
        const el = document.getElementById(`image-${index}`)
        console.log(el)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('activeIndex', activeIndex.toString());
    }, [activeIndex]);

    const galleryImages = useMemo(() => {
        return images ? images.map((image, index) => (
            <GalleryImage
                key={image.src + index}
                {...image}
                isActive={index === activeIndex}
                onClick={handleImageClick}
                imageNumber={index + 1}
                className={className}
            />
        )) : null;
    }, [images, activeIndex, handleImageClick, className]);

    useEffect(() => {
        if (scrollLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [scrollLocked]);



    return (
        <div className={`${styles.gallery} ${className}`} aria-label="Gallery">
            <div className={styles.gallery_container} ref={galleryRef}>
                {galleryImages}
            </div>
            {
                indicators &&
                <CarouselIndicators
                    className={styles.carousel_indicators}
                    items={galleryImages ? galleryImages : []}
                    activeIndex={activeIndex}
                    onClickHandler={handleCarouselIndicatorClick}
                />
            }

        </div>
    );
};
