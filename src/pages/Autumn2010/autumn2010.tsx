import React from 'react';
import { ButtonArt } from '../../components/button.art/ButtonArt';
import {BtnGroupSelect} from "../../components/buttonGroup/btnGroupSelect";
import { data } from './mock';
import styles from './autumn2010.module.css'

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
        </div>
    );
};