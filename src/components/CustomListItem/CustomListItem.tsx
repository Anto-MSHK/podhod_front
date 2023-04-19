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
var classNames = require("classnames");

export interface ListDropDownItemsI {
	text: string;
	onClick: () => void;
}

export interface CustomListItemI extends ListGroupItemProps {
	title?: string;
	subTitle?: string;
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

	const [isActive, setIsActive] = useState(false);

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
					<div>
						<CardTitle className={styles.card_title_container} tag={"h3"}>
							<h3 className={styles.card_title}>{title}</h3>
							{badgeText && (
								<Badge className={styles.badge} pill>
									{badgeText}
								</Badge>
							)}
						</CardTitle>
						{subTitle && (
							<CardSubtitle tag={"p"} className={styles.card_subTitle}>
								{subTitle}
							</CardSubtitle>
						)}
					</div>

					<CardDeck className={styles.dropDown_container}>
						{extra && <div>{extra}</div>}
						{dropdownItems && (
							<Dropdown
								isOpen={dropdownOpen}
								toggle={toggle}
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
									{dropdownItems.map((el, index) => (
										<DropdownItem
											key={el.text + index}
											onClick={el.onClick}
											className={styles.dropDown_item}
										>
											<p>{el.text}</p>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						)}
					</CardDeck>
				</CardHeader>
				{children && <div className={styles.content}>{children}</div>}
			</CustomCard>
		</ListGroupItem>
	);
};

export default CustomListItem;
