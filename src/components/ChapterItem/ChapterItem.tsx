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
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleChapter } from "../../app/Slices/isChapterShownSlice";
import { RootState } from "../../app/store";
import { ChapterForm } from "../ChapterForm/ChapterForm";
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
	const dispatch = useDispatch();
	
	const isChapterShown = useSelector((state: RootState) => state.isChapterShown[chapter.id] || false);
	const handleClick = () => {
		dispatch(toggleChapter(chapter.id));
	};
	const [modalChapter, setModalChapter] = useState(false);
	const toggleEditChapter = () => setModalChapter(!modalChapter);


	const [deleteChapter] = useDeleteChapterMutation();

	const dropdownItems: ListDropDownItemsI[] = [
		 {
			text: "Редактировать",
			onClick: () => handleEditChapter(),
		},
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

	const handleEditChapter = () => {
		toggleEditChapter()
	}

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
						onClick={() => handleClick()}
						icon={scaleIcon}
					></CustomBtn>
					<DropDown items={dropdownItems} isOpenState={isOpenState} />
				</div>
			}
		>
			<Collapse isOpen={isChapterShown}>
				<CustomCard className={styles.card_body}>
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
			<LayoutForm chapterId={"" + chapter.id} modal={modal} />
			<Modal
						isOpen={modalChapter}
						toggle={toggleEditChapter}
						size={"xl"}
						contentClassName={styles.modalWrapper}
						className={styles.modal}
						backdropClassName={styles.modalModal}
					>
						{eventId && (
							<ChapterForm
								eventId={eventId}
								showPieceId={showpieceId}
								toggleChapter={toggleEditChapter}
								isEdit
								defaultData={chapter}
								chapterId={''+chapter.id}
							/>
						)}
					</Modal>
		</CustomListItem>
	);
};

export default ChapterItem;
