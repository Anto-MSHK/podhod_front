import React, {FC, useState} from 'react';
import {Button} from "reactstrap";
import styles from '../buttonGroup.module.css'

interface selectBtnI {
    data: { name: string; }[];
}

export const SelectBtnGroup: FC<selectBtnI> = ({data}) => {

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
            {data && data.map((el, index) => {
                index++
                return (
                    <div>
                        <Button
                            color="warning"
                            onClick={() => onCheckboxBtnClick(index)}
                            active={cSelected.includes(index)}
                            outline
                        >
                            {el.name}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
};