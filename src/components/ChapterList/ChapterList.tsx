import React, { useState } from "react";
import styles from "./ChapterList.module.css";
import { exhibitsT } from "../../app/Types/ExhibitsT";
import { CustomBtn } from "../CustomBtn/CustomBtn";
import { Button, ListGroup, Modal } from "reactstrap";
import { ChapterForm } from "../ChapterForm/ChapterForm";
import { useDeleteChapterMutation } from "../../app/services/ChapterApi";
import ChapterItem from "../ChapterItem/ChapterItem";
import editIcon from "../../assets/icons/editIcon.svg";
import CustomCard from "../CustomCard/CustomCard";
import CustomListItem from "../CustomListItem/CustomListItem";

type ChapterListT = {
	showpiece: exhibitsT;
	eventId: string;
};

export const ChapterList: React.FC<ChapterListT> = ({ showpiece, eventId }) => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<div>
			<ListGroup className={styles.chapters_container}>
				{showpiece?.chapters &&
					showpiece.chapters.map((chapter, index) => (
						<ChapterItem
							key={chapter.id + index + chapter.title}
							chapter={chapter}
							showpieceId={showpiece.id}
							eventId={eventId}
						/>
					))}
			</ListGroup>
		</div>
	);
};

