import React, { FC } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { number } from "yup";
import styles from "./InfoComponent.module.css";

type IInfoComponent = {
  title: string;
  icon?: string;
  desc?: string;
  iconWidth?: number;
};

export const InfoComponent: FC<IInfoComponent> = ({
  icon,
  title,
  desc,
  iconWidth,
}) => {
  return (
    <div>
      <Card className={styles.card_wrapper} >
        <CardBody className={styles.card_body}>
            <div className={styles.card_icon_container}>
              <img
                className={styles.card_icon}
                style={{
                  width: iconWidth ? iconWidth : "30px",
                  height: iconWidth ? iconWidth : "30px",
                }}
                src={icon}
                alt=""
              />
            </div>
          <CardTitle  className={styles.card_title}>
            <h3 className={styles.card_title_text}>{title}</h3>
            <p className={styles.card_text}>{desc}</p> 
          </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};
