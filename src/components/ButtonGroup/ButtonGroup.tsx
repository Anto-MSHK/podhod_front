import React, { FC, useState } from "react";
import {
    Button,
    ButtonGroup,
    ButtonGroupProps,
    ButtonToolbar,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from "reactstrap";
import styles from "./ButtonGroup.module.css";
import { ButtonArt } from "../ButtonArt/ButtonArt";
import { useNavigate } from 'react-router-dom';

export type btnGroup = {
    name: string;
    icon?: any;
    onClick?: () => void;
    label?: string;
    disabled?: boolean;
}[];

interface BtnGroupI extends ButtonGroupProps {
    view: string;
    data: btnGroup;
    handleActiveBtn?: (lable: string | number[] | number) => void;
}

export const BtnGroupSelect: FC<BtnGroupI> = ({
    view,
    data,
    handleActiveBtn,
}) => {
    const [rSelected, setRSelected] = useState<number | null>(0);
    const [cSelected, setCSelected] = useState<number[]>([]);

    const navigate = useNavigate();

    const handleRadioClick = (index: number) => {
        setRSelected(index);
    };
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
            handleActiveBtn(newSelected);
        }
    };

    const renderButton = (
        el: {
            name: string;
            icon?: any;
            onClick?: () => void;
            lable?: string;
            splits?: [{ title: string; label: string; onClick: () => void; }];
        },
        index: number
    ) => {
        const isActive =
            view === "radio" ? rSelected === index : cSelected.includes(index);

        const handleClick =
            view === "radio"
                ? () => handleRadioClick(index)
                : () => handleSelectClick(index);

        const combinedOnClick = () => {
            handleClick();
            el.onClick && el.onClick();
            if (el.lable && handleActiveBtn) {
                handleActiveBtn(el.lable);
            }
        };

        if (el.splits)
            return (
                <UncontrolledDropdown group>
                    <Button
                        className={`${styles.btnItem} ${isActive ? styles.active : styles.deactivate
                            }`}
                        color={isActive ? "warning" : undefined}
                        onClick={combinedOnClick}
                        active={isActive}
                        icon={el.icon}
                    >
                        {el.name}
                    </Button>
                    <DropdownToggle
                        style={{ width: 50 }}
                        caret
                        className={`${styles.btnItem} ${isActive ? styles.active : styles.deactivate
                            }`}
                        onClick={combinedOnClick}
                        active={isActive}
                    />
                    <DropdownMenu>
                        <DropdownItem header>
                            <p className="min" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0 }}>
                                Все страницы <ButtonArt style={{ maxHeight: '30px' }} onClick={() => navigate('create-page')}>+</ButtonArt>
                            </p>
                        </DropdownItem>
                        {el.splits.length > 0 &&
                            el.splits.map((split) => (
                                <DropdownItem className={styles.dropItem}>
                                    <p
                                        style={{
                                            margin: 0,
                                            padding: "10px 0",
                                        }}
                                    >
                                        {split.title}
                                    </p>
                                </DropdownItem>
                            ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        else
            return (
                <div key={index}>
                    <ButtonArt
                        className={`${styles.btnItem} ${isActive ? styles.active : styles.deactivate
                            }`}
                        color={isActive ? "warning" : undefined}
                        onClick={combinedOnClick}
                        active={isActive}
                        icon={el.icon}
                        disabled={false}
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
