import React, { FC, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle, CardHeader, CardDeck, CardImg } from 'reactstrap';
import { number } from "yup";
import styles from "./InfoMessage.module.css";


type iconPositonT = 'top' | 'right' | 'left' | 'bottom'
type InfoMessageT = {
  title?: string;
  titleTag?: React.ElementType<any>
  icon?: string;
  desc?: string;
  descTag?: React.ElementType<any>;
  iconWidth?: number;
  iconPosition?: iconPositonT;
  style?: React.CSSProperties;
};

export const InfoMessage: FC<InfoMessageT> = ({
  icon,
  title,
  desc,
  iconWidth,
  iconPosition,
  descTag,
  titleTag,
  style,
}) => {


  const classNameHandler = () => {
    switch (iconPosition) {
      case 'right':
        return "right_direction"
      case 'top':
        return "top_direction"
      case 'bottom':
        return "bottom_direction"
      default:
        return ''
    }
  }
  let className = classNameHandler()

  return (

    <Card className={styles.card_wrapper} style={style} >
      <CardBody className={`${styles.card_body}  ${className && styles[className]}`}>
        {
          icon &&
          <CardImg className={styles.card_icon}
            src={icon}
            style={{
              width: iconWidth ? iconWidth : "30px",
              height: iconWidth ? iconWidth : "30px",
            }} >
          </CardImg>
        }
        <CardTitle className={styles.card_text_container}>
          <CardText tag={titleTag ? titleTag : 'h3'} className={styles.card_text} >
            {title}
          </CardText>
          <CardText tag={descTag ? descTag : 'p'} className={styles.card_text}>
            {desc}
          </CardText>
        </CardTitle>
      </CardBody>
    </Card>
  );
};
