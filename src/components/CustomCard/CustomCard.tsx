import React from 'react'
import { Card, CardProps } from 'reactstrap'
import styles from './CustomCard.module.css'
var classNames = require('classnames');

const CustomCard: React.FC<CardProps> = (props) => {
  let className = props.className

  const classes = classNames(
    styles.custom_card,
    {[styles.outline]: props.outline},
    styles[className as string],
  )

  return (
    <Card  {...props} className={classes}>
      {props.children}
    </Card>
  )
}
export default CustomCard