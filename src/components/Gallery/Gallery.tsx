import React, { useState, useCallback, useMemo, useEffect, useRef, RefObject } from 'react';
import styles from './Gallery.module.css';
import { Carousel, CarouselCaption, CarouselIndicators, CarouselItem } from 'reactstrap';

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
    isActive?: boolean;
    onClick: (index: number) => void;
    imageNumber: number;
    className?: string;

}

const GalleryImage: React.FC<GalleryImageProps> = React.memo(({ src, alt, isActive =false, onClick, imageNumber, className }) => {
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

    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

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
        if (!images) {
            return null
        }

        if (indicators) {
            return (
                images.map((image, index) => (
                    <CarouselItem key={image.src}
                        onExiting={() => setAnimating(true)}
                        onExited={() => setAnimating(false)}
                        className={styles.image_container}
                    >
                        <CarouselCaption 
                        className={styles.image_caption}
                        captionText={image.alt} />
                        <GalleryImage
                            key={image.src + index}
                            {...image}
                            onClick={handleImageClick}
                            imageNumber={index + 1}
                            className={styles.image}
                        />
                    </CarouselItem>
                )))
        }

        return (
            images.map((image, index) => (
                <GalleryImage
                    key={image.src + index}
                    {...image}
                    onClick={handleImageClick}
                    imageNumber={index + 1}
                    isActive={index === activeIndex}
                    className={styles.image}
                />
            )))

    }, [images, activeIndex, handleImageClick, className]);

    useEffect(() => {
        if (scrollLocked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [scrollLocked]);

    if (indicators) {
        return (
            <Carousel className={`${styles.slider}`}
                aria-label="Gallery"
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                {galleryImages}
                {
                    indicators &&
                    <CarouselIndicators
                        className={styles.carousel_indicators}
                        items={galleryImages ? galleryImages : []}
                        activeIndex={activeIndex}
                        onClickHandler={handleCarouselIndicatorClick}
                    />
                }

            </Carousel>
        )
    }

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
