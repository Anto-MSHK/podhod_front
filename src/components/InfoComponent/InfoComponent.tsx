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
      <Card className={styles.card_wrapper} inverse>
        <CardBody>
          <CardTitle  className={styles.card_title}>
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
            <h3 className={styles.card_title_text}>{title}</h3>
          </CardTitle>
          <CardText
            tag={"p"}
            className={styles.card_text}
            style={{ marginLeft: iconWidth ? iconWidth + 10 : 40 }}
          >
            {desc}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};
