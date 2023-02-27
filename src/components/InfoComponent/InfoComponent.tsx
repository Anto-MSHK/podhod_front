import React, { FC } from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import styles from "./InfoComponent.module.css";

interface IInfoComponent{
    icon?: string;
}

export const InfoComponent: FC<IInfoComponent> = ({icon}) => {
  return (
    <div>
         <Card
    className="my-2"
    color="dark"
    inverse
    style={{
      width: '19rem'
    }}
  >
    
    <CardBody >
      <CardTitle tag="h5" className={styles.icon_info}>
      <img src={icon} alt='' className={styles.iconred} />
        Не может быть опубликовано
      </CardTitle>
      <CardText className={styles.text}>
      Есть незаполненные поля
      </CardText>
    </CardBody>
  </Card>
    </div>
  )
}




