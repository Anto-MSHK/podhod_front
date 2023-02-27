import React, {FC, useState} from 'react';
import {Button, Spinner} from "reactstrap";
import styles from "./ButtonFilter.module.css";


interface SortI {
    sort: { name: string}[];
    date: string | number;
    type?: string;
}

export const BtnFilters: FC<SortI> = ({date,sort , type}) => {

    const [cSelected, setCSelected] = useState<number []>([]);

    const onCheckboxBtnClick = (selected: number) => {
        const index = cSelected.indexOf(selected);
        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }
        setCSelected([...cSelected]);
    };

    return (
        <div className={styles.buttonsWrapper}>
            {sort && sort.map((el, index) => {
                index++
                return (
                    <div key={index}>
                        <Button
                            color={cSelected.includes(index) ? "warning" : undefined}
                            className={`${styles.btnItem} ${
                                cSelected.includes(index) ? styles.active : styles.deactivate
                            }`}
                            onClick={() => onCheckboxBtnClick(index)}
                            active={cSelected.includes(index)}
                        ><Spinner size="sm">
                        </Spinner>
                            <span>
                             {' '}{el.name}
                        </span>
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};

export default BtnFilters;