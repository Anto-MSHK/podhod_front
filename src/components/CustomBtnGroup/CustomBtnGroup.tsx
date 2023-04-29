import React, { FC, useEffect, useState } from "react";
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
import styles from "./CustomBtnGroup.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";

export type btnGroup = {
	name: string;
	icon?: any;
	onClick?: () => void;
	label?: string;
}[];

interface BtnGroupI extends ButtonGroupProps {
	view: string;
	type?: string;
	data: btnGroup;
	handleActiveBtn?: (lable: string | number[] | number | null) => void;
	activeBtn?: number;
}

export const CustomBtnGroup: FC<BtnGroupI> = ({
	view,
	data,
	handleActiveBtn,
	type,
	activeBtn
}) => {
	const [rSelected, setRSelected] = useState<number | null>(0);
	const [cSelected, setCSelected] = useState<number[]>([]);

	const handleRadioClick = (index: number) => {
		setRSelected(index);

		if (handleActiveBtn) {
			handleActiveBtn(index);
		}
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

	useEffect(() => {
		if (handleActiveBtn && activeBtn !== null && activeBtn !== undefined) {
			handleActiveBtn(activeBtn);
		}
	}, [activeBtn, handleActiveBtn]);

	const renderButton = (
		el: {
			name: string;
			icon?: any;
			onClick?: () => void;
			lable?: string;
			splits?: [{ title: string; label: string; onClick?: () => void }];
		},
		index: number,
	) => {
		const isActive =
			view === "radio" ? activeBtn === index : cSelected.includes(index);

		const handleClick =
			view === "radio"
				? () => handleRadioClick(index)
				: () => handleSelectClick(index);

		const combinedOnClick = () => {
			handleClick();
			el.onClick && el.onClick();
		};

		if (el.splits)
			return (
				<UncontrolledDropdown group>
					<CustomBtn
						className={`${styles.btnItem} ${
							isActive ? styles.active : styles.deactivate
						}`}
						color={isActive ? "warning" : undefined}
						onClick={combinedOnClick}
						active={isActive}
						icon={el.icon}
					>
						{el.name}
					</CustomBtn>
					<DropdownToggle
						style={{ width: 50 }}
						caret
						className={`${styles.btnItem} ${
							isActive ? styles.active : styles.deactivate
						}`}
						onClick={combinedOnClick}
						active={isActive}
					/>
					<DropdownMenu>
						<DropdownItem header>
							<p className="min" style={{ margin: 0 }}>
								Все страницы
							</p>
						</DropdownItem>
						{el.splits.length > 0 &&
							el.splits.map(split => (
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
					<CustomBtn
				
						className={`${styles.btnItem} ${
							type === "filter"
								? isActive
									? styles.fltActive
									: styles.fltDeactivate
								: isActive
								? styles.active
								: styles.deactivate
						}`}
						color={
							type === "filter"
								? isActive
									? "primary"
									: undefined
								: isActive
								? "warning"
								: undefined
						}
						onClick={combinedOnClick}
						active={isActive}
						icon={el.icon}
					>
						{el.name}
					</CustomBtn>
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
