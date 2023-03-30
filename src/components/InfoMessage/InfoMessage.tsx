import React, { FC, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle, CardHeader, CardDeck, CardImg } from 'reactstrap';
import { number } from "yup";
import styles from "./InfoMessage.module.css";


type iconPositonT = 'top' | 'right' | 'left' | 'bottom'
type InfoMessageT = {
  className?: string
  title?: string;
  titleTag?: React.ElementType<any>
  icon?: string;
  desc?: string;
  descTag?: React.ElementType<any>;
  iconWidth?: number;
  iconPosition?: iconPositonT;
  style?: React.CSSProperties;
  backgroundColor?: string
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
  className,
  backgroundColor,
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
  let positionClassName = classNameHandler()

  return (

    <Card 
      className={`${styles.card_body} ${positionClassName && styles[positionClassName]} ${className && className}`} 
      style={{backgroundColor: backgroundColor, ...style}}
      >
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
      <div className={styles.card_text_container}>
        <CardText tag={titleTag ? titleTag : 'h3'} className={styles.card_text} >
          {title}
        </CardText>
        <CardText tag={descTag ? descTag : 'p'} className={styles.card_text}>
          {desc}
        </CardText>
      </div>
    </Card>
  );
};
