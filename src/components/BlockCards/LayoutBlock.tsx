import React, { FC, useState } from "react";
import {
	Card,
	CardBody,
	CardHeader,
	CardText,
	CardTitle,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Tag,
} from "reactstrap";
import { InfoTag } from "../InfoTag/InfoTag";
import { BlockTypes, ImgBlockT, TextBlockT } from "../../app/Types/ChapterT";
import { TextBlock } from "./TextBlock/TextBlock";
import { ImgBlock } from "./ImgBlock/ImgBlock";
import { DropDown, ListDropDownItemsI } from "../DropDown/DropDown";
import { useDeleteBlockMutation } from "../../app/services/ChapterApi";
import { LayoutForm } from "../BlockForms/LayoutForm";

interface LayoutBlockI {
	title: string;
	chapterId: number;
	blockId: number;
	type: BlockTypes;
	data: TextBlockT | ImgBlockT;
}

const themes = {
	text: {
		textTitle: "rgb(163, 195, 255, 1)",
		text: "rgb(112, 162, 255, 0.9)",
		background: "rgb(90, 132, 209, 0.1)",
		infoColor: "rgb(90, 132, 209, 0.5)",
	},
	img: {
		textTitle: "rgb(163, 255, 172, 1)",
		text: "rgb(120, 255, 133, 0.9)",
		background: "rgb(72, 182, 83, 0.1)",
		infoColor: "rgb(72, 182, 83, 0.5)",
	},
};

export const LayoutBlock: FC<LayoutBlockI> = ({
	title,
	type,
	data,
	chapterId,
	blockId,
}) => {
	let curBlock = undefined;
	let curTypeText = undefined;
	const [deleteChapter] = useDeleteBlockMutation();
	const modal = useState(false);
	const isOpenState = useState(false);
	const dropdownItems: ListDropDownItemsI[] = [
		{
			text: "Редактировать",
			onClick: () => {
				modal[1](prev => !prev);
			},
		},
		{
			text: "Удалить",
			onClick: () => handleDeleteChapter(data.id, chapterId),
		},
	];
	const handleDeleteChapter = async (id: number, chapterId: number) => {
		try {
			const payload = await deleteChapter({
				chapterId: "" + chapterId,
				blockId: "" + blockId,
			}).unwrap();
		} catch (error) {
			console.log(error);
		}
	};

	switch (type) {
		case "text":
			curBlock = <TextBlock {...(data as TextBlockT)} />;
			curTypeText = "текст";
			break;
		case "img":
			curBlock = <ImgBlock {...(data as ImgBlockT)} />;
			curTypeText = "слайдер";
			break;
		default:
			<></>;
	}
	return (
		<ListGroupItem
			style={{ borderRadius: 10, backgroundColor: themes[type].background }}
		>
			<ListGroupItemHeading
				tag="h5"
				style={{
					// padding: "10px 15px",
					color: "white",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h5
					style={{ margin: 0, fontWeight: 600, color: themes[type].textTitle }}
				>
					{title}
				</h5>
				<div
					style={{ display: "flex", gap: 15, height: 40, alignItems: "center" }}
				>
					<InfoTag text={curTypeText} color={themes[type].infoColor} />
					<DropDown items={dropdownItems} isOpenState={isOpenState} />
				</div>
			</ListGroupItemHeading>
			<ListGroupItemText style={{ color: themes[type].text, display: "grid" }}>
				{curBlock}
			</ListGroupItemText>
			<LayoutForm
				chapterId={"" + chapterId}
				defaultData={{ title, data }}
				blockId={"" + blockId}
				modal={modal}
				isEdit
				blockType={type}
			/>
		</ListGroupItem>
	);
};
