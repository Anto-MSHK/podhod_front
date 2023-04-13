import React, { useState } from 'react';
import styles from './Gallery.module.css';

interface ImageProps {
    src: string;
    alt: string;
}

export const Gallery: React.FC<{ images: ImageProps[] }> = ({ images }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index === selectedImageIndex ? null : index);
    };

    return (
        <div className={styles.gallery}>
            {images.map((image, index) => (
                <div
                    key={image.src}
                    className={`${styles.imageWrapper} ${index === selectedImageIndex ? styles.selected : ''}`}
                    onClick={() => handleImageClick(index)}
                >
                    <img src={image.src} alt={image.alt} className={styles.image} />
                </div>
            ))}
        </div>
    );
};
