import React, { FC, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import { number } from "yup";
import styles from "./InfoMessage.module.css";


type iconPositonT = 'top' | 'right' | 'left'
type InfoComponentT = {
  title?: string;
  icon?: string;
  desc?: string;
  iconWidth?: number;
  iconPosition?: iconPositonT
};

export const InfoMessage: FC<InfoComponentT> = ({
  icon,
  title,
  desc,
  iconWidth,
  iconPosition,
}) => {
  

  const classNameHandler = () => {
    switch (iconPosition) {
      case 'right':
        return "right_direction"
      case 'top':
        return "top_direction"
      default:
        return undefined
    }
  }
  let className = classNameHandler()

  return (
    <div>
      <Card className={styles.card_wrapper} >
        <CardBody className={`${styles.card_body}  ${className && styles[className]}`}>
          <div className={styles.card_icon_container}  >
            <img
              className={styles.card_icon}
              style={{
                width: iconWidth ? iconWidth : "30px",
                height: iconWidth ? iconWidth : "30px",
              }}
              src={icon}
              alt={icon}
            />
          </div>
          <CardTitle className={styles.card_title} >
            <h3 className={styles.card_title_text}>{title}</h3>
            <p className={styles.card_text}>{desc}</p>
          </CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};
