import React, {FC, useState} from 'react';
import {Button} from "reactstrap";
import styles from '../buttonGroup.module.css'

interface radioBtnI {
    data: { name: string; }[];
}

export const RadioBtnGroup: FC<radioBtnI> = ({data}) => {

    const [rSelected, setRSelected] = useState<number | null>(null);

    return (
        <div className={styles.buttonsWrapper}>
            {data && data.map((el, index) => {
                index++
                return (
                    <div>
                        <Button
                            color="warning"
                            onClick={() => setRSelected(index)}
                            active={rSelected === index}
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