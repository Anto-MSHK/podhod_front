import React, { FC, useState } from 'react';
import { ButtonArt } from '../ButtonArt/ButtonArt';
import styles from './ButtonFilter.module.css';
import icon10 from '../../assets/icons/Icon10.svg'
import icon11 from '../../assets/icons/Icon11.svg'

interface SortI {
    sort: { name: string, icon: string }[];
    date: string;
    type?: string;
    onFilter: (date: string | number, type?: string | undefined) => void;
}

export const BtnFilters: FC<SortI> = ({ date, sort, type, onFilter }) => {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

    const handleDateFilter = (date: string | number) => {
        onFilter(date, type);
    };

    const handleTypeFilter = (type: string, index: number) => {
        setSelectedButtonIndex(index);
        onFilter(date, type);
    };

    return (
        <div className={styles.buttonsWrapper}>
            {sort &&
                sort.map((el, index) => {
                    index++;
                    const isActive = index === selectedButtonIndex;

                    return (
                        <div key={index}>
                            {el.name === 'Date' ? (
                                <ButtonArt
                                    className={`${styles.btnItem} ${
                                        date === 'all' || date === el.name.toLowerCase()
                                            ? styles.activate
                                            : styles.deactivate
                                    }`}
                                    onClick={() => handleDateFilter(el.name.toLowerCase())}
                                >
                                    <img src={el.icon} alt={`icon ${index}`} />
                                    <span className={styles.btnItem}>{el.name}</span>
                                </ButtonArt>
                            ) : (
                                <ButtonArt
                                    color={isActive ? 'warning' : undefined}
                                    className={`${styles.btnItem} ${isActive ? styles.activate : styles.deactivate}`}
                                    onClick={() => handleTypeFilter(el.name.toLowerCase(), index)}
                                    active={isActive}
                                >
                                    <img src={el.icon} alt={`icon ${index}`} />
                                    <span className={styles.btnItem}>{el.name}</span>
                                </ButtonArt>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};
