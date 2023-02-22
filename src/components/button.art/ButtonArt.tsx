import React, {FC} from 'react'
import {Button} from 'reactstrap'
import styles from "./ButtonArt.module.css";

interface IButtonArt {
    name: string,

}

export const ButtonArt: FC<IButtonArt> = ({name}) => {
    return (
        <div className={styles.customBtnWrapper}>
            <div>
                <Button
                    color={'warning'}
                    className={styles.customBtn}
                >
                    {name}
                </Button>
            </div>
        </div>
    )
}


