import React, { useState, useCallback, useMemo, useEffect } from 'react';
import styles from './Gallery.module.css';

interface ImageProps {
    src: string;
    alt: string;
}

interface GalleryProps {
    images: ImageProps[];
    className?: string;
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
        >
            <img src={src} alt={alt} className={styles.image} />
        </figure>
    );
});

export const Gallery: React.FC<GalleryProps> = ({ images, className = '' }) => {
    const [activeIndex, setActiveIndex] = useState<number>(() => {
        const storedIndex = localStorage.getItem('activeIndex');
        return storedIndex !== null ? parseInt(storedIndex, 10) : -1;
    });

    const handleImageClick = useCallback((index: number) => {
        setActiveIndex((prevActiveIndex) => (index === prevActiveIndex ? -1 : index));
    }, []);

    useEffect(() => {
        localStorage.setItem('activeIndex', activeIndex.toString());
    }, [activeIndex]);

    const galleryImages = useMemo(() => {
        return images?.map((image, index) => (
            <GalleryImage
                key={image.src}
                {...image}
                isActive={index === activeIndex}
                onClick={handleImageClick}
                imageNumber={index + 1}
                className={className}
            />
        ));
    }, [images, activeIndex, handleImageClick, className]);

    return (
        <div className={`${styles.gallery} ${className}`} aria-label="Gallery">
            {galleryImages}
        </div>
    );
};
