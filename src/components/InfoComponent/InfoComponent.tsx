import React, { FC } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import styles from "./InfoComponent.module.css";

type IInfoComponent = {
  title: string;
  icon?: string;
  desc?: string;
}

export const InfoComponent: FC<IInfoComponent> = ({ icon, title, desc }) => {
  return (
    <div>
      <Card className="my-2" color="dark" inverse>
        <CardBody>
          <CardTitle tag="h3" className={styles.icon_info}>
            <img src={icon} alt="" className={styles.iconred} />
            {title}
          </CardTitle>
          <CardText tag={"p"} className={styles.text + " min"}>
            {desc}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};
