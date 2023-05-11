import React, { useState } from "react";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
	Badge,
	CardBody,
	CardDeck,
	CardHeader,
	CardSubtitle,
	CardTitle,
	Collapse,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	ListGroupItem,
	ListGroupItemProps,
	ListGroupItemText,
} from "reactstrap";
import styles from "./CustomListItem.module.css";
import CustomCard from "../CustomCard/CustomCard";
import { DropDown } from "../DropDown/DropDown";
var classNames = require("classnames");

export interface ListDropDownItemsI {
	text: string;
	onClick: () => void;
}

export interface CustomListItemI extends ListGroupItemProps {
	title?: any;
	subTitle?: any;
	badgeText?: string | number;
	extra?: JSX.Element;
	tag?: React.ElementType<any>;
	className?: string;
	active?: boolean;
	action?: boolean;
	dropdownItems?: ListDropDownItemsI[];
}

const CustomListItem: React.FC<CustomListItemI> = props => {
	const {
		onClick,
		badgeText,
		title,
		subTitle,
		extra,
		tag = "div",
		className = "",
		action = false,
		active = false,
		dropdownItems,
		children,
	} = props;

	const isOpenState = useState(false);

	let classes = classNames(className, styles.item);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(prevState => !prevState);

	/* const handleClick = () => {
       if (active) {
           setIsActive(true)
       }s
         return onClick
    } */

	return (
		<ListGroupItem
			tag={tag}
			className={classes}
			cssModule={{
				active: styles.active,
				"list-group-item-action": styles["action"],
				disabled: styles.disabled,
				"list-group-item": "list-item",
			}}
			onClick={onClick}
			action={action}
			active={active}
		>
			<CustomCard
				className={styles.card_container + ` ${active ? "active" : ""}`}
			>
				<CardHeader className={styles.card_header}>
					<div style={{ width: "100%" }}>
						<CardTitle className={styles.card_title_container} tag={"h3"}>
							<h3
								className={styles.card_title}
								style={{
									lineHeight: "25px",
									fontWeight: !active ? 500 : 700,
								}}
							>
								{title}
							</h3>
							{badgeText && (
								<Badge className={styles.badge} pill>
									{badgeText}
								</Badge>
							)}
						</CardTitle>
						{subTitle && (
							<CardSubtitle
								tag={"p"}
								className={styles.card_subTitle + ` ${!active ? "min" : ""}`}
								style={{
									marginTop: "5px",
									color: !active ? "#a3a3a3" : undefined,
									lineHeight: "17px",
								}}
							>
								{subTitle}
							</CardSubtitle>
						)}
					</div>

					<CardDeck className={styles.dropDown_container}>
						{extra && <div>{extra}</div>}
						{dropdownItems && (
							<DropDown items={dropdownItems} isOpenState={isOpenState} />
						)}
					</CardDeck>
				</CardHeader>
				{children && <div className={styles.content}>{children}</div>}
			</CustomCard>
		</ListGroupItem>
	);
};

export default CustomListItem;
