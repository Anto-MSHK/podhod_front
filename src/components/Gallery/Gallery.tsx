import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

interface ImageProps {
    src: string;
    alt: string;
}

interface GalleryProps {
    images: ImageProps[];
    className?: string;
    scrollLocked?: boolean;
    isDisabled?: boolean; // добавить isDisabled prop
}

interface GalleryImageProps extends ImageProps {
    isActive: boolean;
    onClick: (index: number) => void;
    imageNumber: number;
    className?: string;
    isDisabled?: boolean; // добавить isDisabled prop
}

const GalleryImage: React.FC<GalleryImageProps> = React.memo(({ src, alt, isActive, onClick, imageNumber, className, isDisabled }) => {
    const handleClick = useCallback(() => {
        onClick(imageNumber - 1);
    }, [onClick, imageNumber]);

    return (
      <figure
        className={`${styles.imageWrapper} ${isActive ? styles.selected : ''} ${isDisabled ? styles.disabled : ''} ${className}`}
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

export const Gallery: React.FC<GalleryProps> = ({ images, className = '', scrollLocked = false, isDisabled = false }) => { // добавить isDisabled в деструктуризацию props
    const [activeIndex, setActiveIndex] = useState<number>(() => {
        const storedIndex = localStorage.getItem('activeIndex');
        return storedIndex !== null ? parseInt(storedIndex, 10) : -1;
    });

    const handleImageClick = useCallback((index: number) => {
        setActiveIndex(prevActiveIndex => index === prevActiveIndex ? -1 : index);
    }, []);

    const emptyFunction = useCallback(() => {}, []);

    useEffect(() => {
        localStorage.setItem('activeIndex', activeIndex.toString());
    }, [activeIndex]);

    useEffect(() => {
        if (scrollLocked) {
            galleryRef.current?.classList.add(styles.scrollLocked);
        } else {
            galleryRef.current?.classList.remove(styles.scrollLocked);
        }

        if (isDisabled) {
            galleryRef.current?.classList.add(styles.disabled);
        } else {
            galleryRef.current?.classList.remove(styles.disabled);
        }
    }, [scrollLocked, isDisabled]);

    const galleryImages = useMemo(() => {
        return images ? images.map((image, index) => (
          <GalleryImage
            key={image.src}
            {...image}
            isActive={isDisabled ? false : index === activeIndex}
            onClick={isDisabled ? emptyFunction : handleImageClick} // использовать пустую функцию, если isDisabled передан
            imageNumber={index + 1}
            className={className}
          />
        )) : null;
    }, [images, activeIndex, handleImageClick, className, isDisabled, emptyFunction]);

    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollLocked) {
            galleryRef.current?.classList.add(styles.scrollLocked);
        } else {
            galleryRef.current?.classList.remove(styles.scrollLocked);
        }
    }, [scrollLocked]);

    return (
      <div ref={galleryRef} className={`${styles.gallery}`}>
          {galleryImages}
      </div>
    );
};
