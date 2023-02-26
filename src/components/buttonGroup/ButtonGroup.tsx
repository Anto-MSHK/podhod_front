import React, { FC, useState } from "react";
import { ButtonGroup, ButtonToolbar } from "reactstrap";
import styles from './buttonGroup.module.css'
import {ButtonArt} from "../ButtonArt/ButtonArt";

type btnGroup = { name: string }[];

interface BtnGroupI {
  view: string;
  data: btnGroup;
}

export const BtnGroupSelect: FC<BtnGroupI> = ({ view, data }) => {
  const [rSelected, setRSelected] = useState<number | null>(0);
  const [cSelected, setCSelected] = useState<number[]>([]);

  const handleRadioClick = (index: number) => setRSelected(index);

  const handleSelectClick = (index: number) => {
    const selectedIndex = cSelected.indexOf(index);
    const newSelected = [...cSelected];
    if (selectedIndex < 0) {
      newSelected.push(index);
    } else {
      newSelected.splice(selectedIndex, 1);
    }
    setCSelected(newSelected);
  };

  const renderButton = (el: { name: string }, index: number) => {
    const isActive =
      view === "radio" ? rSelected === index : cSelected.includes(index);

    const handleClick =
      view === "radio"
        ? () => handleRadioClick(index)
        : () => handleSelectClick(index);

    return (
      <div key={index}>
        <ButtonArt
          className={`${styles.btnItem} ${
            isActive ? styles.active : styles.deactivate
          }`}
          color={isActive ? "warning" : undefined}
          onClick={handleClick}
          active={isActive}
        >
          {el.name}
        </ButtonArt>
      </div>
    );
  };

  return (
    <ButtonToolbar>
      <ButtonGroup>
        <div className={styles.buttonsWrapper}>
          {data && data.map(renderButton)}
        </div>
      </ButtonGroup>
    </ButtonToolbar>
  );
};
