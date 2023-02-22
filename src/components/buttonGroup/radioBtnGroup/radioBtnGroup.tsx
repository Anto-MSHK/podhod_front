import React, { FC, useState } from "react";
import { Button } from "reactstrap";
import styles from "../buttonGroup.module.css";

interface radioBtnI {
  data: { name: string }[];
}

export const RadioBtnGroup: FC<radioBtnI> = ({ data }) => {
  const [rSelected, setRSelected] = useState<number | null>(null);

  return (
    <div className={styles.buttonsWrapper}>
      {data &&
        data.map((el, index) => {
          index++;
          return (
            <div key={index}>
              <Button
                color={rSelected === index ? "warning" : undefined}
                className={`${styles.btnItem} ${
                  rSelected === index ? styles.active : styles.deactivate
                }`}
                onClick={() => setRSelected(index)}
                active={rSelected === index}
              >
                {el.name}
              </Button>
            </div>
          );
        })}
    </div>
  );
};