import React, { useState } from "react";
import styles from "./ChapterItem.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { Card, CardBody, CardTitle, Collapse, Modal } from "reactstrap";
import plusIcon from "../../assets/icons/plusIcon.svg";
import CustomCard from "../CustomCard/CustomCard";
import { ChapterT } from "../../app/Types/ChapterT";
import { useDeleteChapterMutation } from "../../app/services/ChapterApi";
import { BlockItem } from "../BlockItem/BlockItem";
import CustomListItem from "../CustomListItem/CustomListItem";
import scaleIcon from "../../assets/icons/scaleIcon.svg";
import { LayoutBlock } from "../BlockCards/LayoutBlock";
import { LayoutForm } from "../BlockForms/LayoutForm";
import { DropDown, ListDropDownItemsI } from "../DropDown/DropDown";
type ChapterItemT = {
	chapter: ChapterT;
	showpieceId: string;
	eventId: string;
};

const ChapterItem: React.FC<ChapterItemT> = ({
	chapter,
	showpieceId,
	eventId,
}) => {
	const [isChapterShown, setIsChapterShow] = useState(false);
	const [deleteChapter] = useDeleteChapterMutation();

	const dropdownItems: ListDropDownItemsI[] = [
		// {
		// 	text: "Редактировать",
		// 	onClick: () => handleEditExhibit(item),
		// },
		{
			text: "Удалить",
			onClick: () => handleDeleteChapter("" + chapter.id, showpieceId),
		},
	];

	const handleDeleteChapter = async (id: string, showpieceId: string) => {
		try {
			const payload = await deleteChapter({
				eventId,
				id,
				showpieceId,
			}).unwrap();
			console.log(payload);
		} catch (error) {
			console.log(error);
		}
	};

	const modal = useState(false);
	const toggle = () => modal[1](prev => !prev);
	const isOpenState = useState(false);
	return (
		<CustomListItem
			className={styles.chapter_list_wrapper}
			title={chapter.title}
			subTitle={<p className="min">{chapter.description}</p>}
			extra={
				<div className={styles.custombtn}>
					<CustomBtn
						style={{ width: "45px" }}
						onClick={() => toggle()}
						icon={plusIcon}
					></CustomBtn>
					<CustomBtn
						style={{ width: "45px" }}
						onClick={() => setIsChapterShow(!isChapterShown)}
						icon={scaleIcon}
					></CustomBtn>
					<DropDown items={dropdownItems} isOpenState={isOpenState} />
				</div>
			}
		>
			<Collapse isOpen={isChapterShown}>
				<CustomCard className={styles.card_body} outline>
					{chapter.blocks.length > 0 ? (
						chapter.blocks.map((block, index) => (
							<LayoutBlock
								chapterId={chapter.id}
								blockId={block.id}
								title={block.title}
								type={block.type}
								data={(block as any)[`${block.type}Block`]}
							/>
						))
					) : (
						<div style={{ textAlign: "center", padding: 15 }}>
							<h2>Блоков не найдено</h2>
						</div>
					)}
				</CustomCard>
			</Collapse>
			<LayoutForm id={"" + chapter.id} modal={modal} />
		</CustomListItem>
	);
};

export default ChapterItem;
