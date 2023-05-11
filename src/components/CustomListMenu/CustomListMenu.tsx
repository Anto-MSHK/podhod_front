import React from "react";
import CustomListItem, {
	CustomListItemI,
} from "../CustomListItem/CustomListItem";
import { ListGroup } from "reactstrap";
import styles from "./CustomListMenu.module.css";
import { FormInput } from "../Form/FormInput";
import { CustomInput } from "../Form/FormInput";
import { CustomBtn } from "../CustomBtn/CustomBtn";
var classNames = require("classnames");

export interface CustomMenuItemT extends CustomListItemI {
	id?: string;
	key?: string;
}
export interface MenuClickInfo {
	key: string;
	domEvent: MouseEvent;
}
interface CustomListMenu {
	title?: string;
	items: CustomMenuItemT[];
	selectedKey?: string;
	onClick?: (key: MenuClickInfo) => void;
	className?: string;
}
const CustomListMenu: React.FC<CustomListMenu> = props => {
	const { title, items, selectedKey = [], onClick, className } = props;

	function handleItemClick(
		item: CustomMenuItemT,
		e: React.MouseEvent<HTMLElement, MouseEvent>,
	) {
		if (onClick) {
			const clickInfo: MenuClickInfo = {
				key: item.key ? item.key : "",
				domEvent: e.nativeEvent,
			};
			onClick(clickInfo);
		}
	}

	let classes = classNames(className, styles.menu_wrapper);

	return (
		<ListGroup>
			<div className={classes}>
				{items &&
					items.map((item, index) => (
						<CustomListItem
							{...item}
							key={item.key}
							id={item.id}
							onClick={e => handleItemClick(item, e)}
							active={selectedKey === item.key ? true : false}
							className={styles.menu_item}
						></CustomListItem>
					))}
			</div>
		</ListGroup>
	);
};

export default CustomListMenu;
