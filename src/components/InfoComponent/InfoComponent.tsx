import React, { FC } from 'react'
import { Card, CardBody, CardHeader, CardText, CardTitle } from 'reactstrap'
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
      <img src={icon} alt="123"className={styles.iconred} />
        Не может быть опубликовано
      </CardTitle>
      <CardText className={styles.text}>
      Есть не заполненные поля
      </CardText>
    </CardBody>
  </Card>
    </div>
  )
}




