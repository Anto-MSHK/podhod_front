import React, { useState } from "react";
import styles from "./ChapterItem.module.css";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { Card, CardBody, CardTitle, Collapse, Modal } from "reactstrap";
import editIcon from "../../assets/icons/editIcon.svg";
import CustomCard from "../CustomCard/CustomCard";
import { ChapterT } from "../../app/Types/ChapterT";
import { useDeleteChapterMutation } from "../../app/services/ChapterApi";
import { BlockItem } from "../BlockItem/BlockItem";
import CustomListItem from "../CustomListItem/CustomListItem";
import scaleIcon from "../../assets/icons/scaleIcon.svg";
import { LayoutBlock } from "../BlockCards/LayoutBlock";
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
			className={styles.chapter_list_wrapper}
			title={chapter.title}
			subTitle={<p className="min">{chapter.description}</p>}
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
					{chapter.blocks.length > 0 ? (
						chapter.blocks.map((block, index) => (
							<LayoutBlock
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
		</CustomListItem>
	);
};

export default ChapterItem;
