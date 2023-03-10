import React, { FC, useState } from "react";
import { ButtonGroup, ButtonGroupProps, ButtonToolbar } from "reactstrap";
import styles from './ButtonGroup.module.css';
import { ButtonArt } from "../ButtonArt/ButtonArt";

export type btnGroup = { name: string, icon?: any, onClick?: () => void; label?: string }[];

interface BtnGroupI extends ButtonGroupProps {
    view: string;
    data: btnGroup;
    handleActiveBtn?: (lable: string | number[] | number) => void
}

export const BtnGroupSelect: FC<BtnGroupI> = ({ view, data, handleActiveBtn }) => {
    const [rSelected, setRSelected] = useState<number | null>(0);
    const [cSelected, setCSelected] = useState<number[]>([]);

    const handleRadioClick = (index: number) => {
        setRSelected(index);
}
    const handleSelectClick = (index: number) => {
        const selectedIndex = cSelected.indexOf(index);
        const newSelected = [...cSelected];
        if (selectedIndex < 0) {
            newSelected.push(index);
        } else {
            newSelected.splice(selectedIndex, 1);
        }
        setCSelected(newSelected);

        if (handleActiveBtn) {
            handleActiveBtn(newSelected)
        }
    };

    const renderButton = (el: { name: string, icon?: any, onClick?: () => void; lable?: string }, index: number) => {
        const isActive = view === "radio" ? rSelected === index : cSelected.includes(index);

        const handleClick = view === "radio" ? () => handleRadioClick(index) : () => handleSelectClick(index);

        const combinedOnClick = () => {
            handleClick();
            el.onClick && el.onClick();
            if (el.lable && handleActiveBtn) {
                handleActiveBtn(el.lable)
            }

        };

        return (
            <div key={index}>
                <ButtonArt
                    className={`${styles.btnItem} ${isActive ? styles.active : styles.deactivate}`}
                    color={isActive ? "warning" : undefined}
                    onClick={combinedOnClick}
                    active={isActive}
                    icon={el.icon}
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
