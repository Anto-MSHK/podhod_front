import React, { FC } from "react";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";

import styles from "./DropDown.module.css";

export interface ListDropDownItemsI {
	text: string;
	onClick: () => void;
}

interface IDropDown {
	items: ListDropDownItemsI[];
	isOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export const DropDown: FC<IDropDown> = ({ items, isOpenState }) => {
	return (
		<Dropdown
			isOpen={isOpenState[0]}
			toggle={() => isOpenState[1](prev => !prev)}
			direction={"down"}
			className={styles.dropDown}
		>
			<DropdownToggle
				cssModule={{
					btn: styles.dropDown_toggle,
					"btn-secondary": styles.btn_secondary,
				}}
			>
				<h2 className={styles.dropDown__btn_text}>···</h2>
			</DropdownToggle>
			<DropdownMenu className={styles.dropDown_menu}>
				{items.map((el, index) => (
					<DropdownItem
						key={el.text + index}
						onClick={el.onClick}
						className={styles.dropDown_item}
					>
						<p style={{ margin: 0 }}>{el.text}</p>
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
