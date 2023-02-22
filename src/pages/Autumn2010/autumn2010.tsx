import React from 'react';
import { ButtonArt } from '../../components/button.art/ButtonArt';
import {BtnGroupSelect} from "../../components/buttonGroup/btnGroupSelect";
import {data, sort} from './mock';
import styles from './autumn2010.module.css'
import BtnFilters from "../../components/filters/btnFilters";

export const Autumn2010 = () => {
    return (
        <div className={styles.autumn2010Wrapper}>
            <div>
                <h1 className={styles.h1}>Group buttons:</h1>
                <BtnGroupSelect view={'radio'} data={data}/>
            </div>
            <div>
                <h1 className={styles.h1}>Select buttons:</h1>
                <BtnGroupSelect view={'select'} data={data}/>
            </div>
            <div>
                <h1 className={styles.h1}>Test button</h1>
                <ButtonArt name={'Test Button'}/>
            </div>
            <div>
                <h1 className={styles.h1}>Filter buttons:</h1>
                <BtnFilters sort={sort} date={1} type={undefined}/>
            </div>
        </div>
    );
};