import React, { FC } from 'react'
import { Button } from 'reactstrap'
import styles from "./ButtonArt.module.css";

interface IButtonArt{
  name: string,

}

export const ButtonArt: FC<IButtonArt> = ({name}) => {
  return (
    <div className={styles.row}>
      <div>
      <Button
       className={styles.textcolor}
      
      >
       {name}
      </Button>
      </div>
    </div>
  )
}


