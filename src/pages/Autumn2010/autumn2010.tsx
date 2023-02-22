import React from 'react';
import {BtnGroupSelect} from "../../components/buttonGroup/btnGroupSelect";
import { data } from './mock';

export const Autumn2010 = () => {
    return (
        <div>
            <BtnGroupSelect view={'radio'} data={data}/>
            <BtnGroupSelect view={'select'} data={data}/>
        </div>
    );
};