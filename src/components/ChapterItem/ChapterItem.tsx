import React, { useState } from "react";
import styles from "./ChapterItem.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { Card, CardBody, CardTitle, Collapse } from "reactstrap";
import editIcon from "../../assets/icons/editIcon.svg";
import CustomCard from "../CustomCard/CustomCard";
import { ChapterT } from "../../app/Types/ChapterT";
import { useDeleteChapterMutation } from "../../app/services/ChapterApi";
import { BlockItem } from "../BlockItem/BlockItem";
import CustomListItem from "../CustomListItem/CustomListItem";
import scaleIcon from "../../assets/icons/scaleIcon.svg";
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

	return (
		<CustomListItem
			dropdownItems={[
				{
					text: "Редактировать",
					onClick: () => {},
				},
				{
					text: "Удалить",
					onClick: () => handleDeleteChapter(String(chapter.id), showpieceId),
				},
			]}
			className={styles.chapter_list_wrapper}
			title={chapter.title}
			subTitle={chapter.description}
			extra={
				<CustomBtn
					style={{ width: "45px" }}
					onClick={() => setIsChapterShow(!isChapterShown)}
					icon={scaleIcon}
				></CustomBtn>
			}
		>
			<Collapse isOpen={isChapterShown}>
				<CustomCard className={styles.card_body} outline>
					{chapter.blocks.length ? (
						chapter.blocks.map((block, index) => <BlockItem block={block} />)
					) : (
						<div style={{ textAlign: "center" }}>
							<h1>Блоков не найдено</h1>
						</div>
					)}
				</CustomCard>
			</Collapse>
		</CustomListItem>
	);
};

export default ChapterItem;
