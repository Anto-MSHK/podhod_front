import React from "react";
import { EventPreview } from "../../pages/MobilePreview/EventPreview/EventPreview";
import { PagesPreview } from "../../pages/MobilePreview/PagesPreview/PagesPreview";
import { ExhibitsPreview } from "../../pages/MobilePreview/ExhibitsPreview/ExhibitsPreview";
import { useAppSelector } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ChapterPreview } from "../../pages/MobilePreview/ChapterPreview/ChapterPreview";

interface IPreviewSwitcher {
	selectedPageType: string;
}

export const PreviewSwitcher: React.FC<IPreviewSwitcher> = ({ selectedPageType }) => {
	const eventSlice = useAppSelector((state) => state.eventCreate.event);
	const selectedExhibit = useAppSelector((state) => state.selectedExhibit.exhibit);
	const selectedPage = useAppSelector((state) => state.selectedPage.selectedPage)
	const isChapterShown = useSelector((state: RootState) => state.isChapterShown);
	const isChaptersShown = selectedExhibit && selectedExhibit.chapters?.map(chapter => isChapterShown[chapter.id] || false);
	const isAnyChapterShown = isChaptersShown?.some(isShown => isShown) ?? false;
	const chapterId = Object.keys(isChapterShown).find(id => isChapterShown[id]);
	const selectedChapter = selectedExhibit?.chapters?.find(chapter => chapter.id.toString() === chapterId);



	const renderPage = () => {
		switch (selectedPageType) {
			case "EventPreview":
				return <EventPreview data={eventSlice} />;
			case "PagesPreview":
				return <PagesPreview data={selectedPage}/>;
			case "ExhibitsPreview":
				if (isAnyChapterShown) {
					return <ChapterPreview data={selectedChapter} exhibit={selectedExhibit} />
				}
				else return <ExhibitsPreview data={selectedExhibit}/>;
			default:
				return <EventPreview data={eventSlice} />;
		}
	};

	return (
		<div>
			{renderPage()}
		</div>
	);
};
