import React from "react";
import { EventPage } from "../../pages/MobilePreview/EventPage/EventPage";
import { ExhibitPage } from "../../pages/MobilePreview/ExhibitPage/ExhibitPage";
import { ChapterPage } from "../../pages/MobilePreview/ChapterPage/ChapterPage";
import { PreviewLayout } from "../PreviewLayout/PreviewLayout";
import { useAppSelector } from "../../app/hooks";

interface IPreviewSwitcher {
	selectedPageType: string;
}

export const PreviewSwitcher: React.FC<IPreviewSwitcher> = ({ selectedPageType }) => {
	const eventSlice = useAppSelector((state) => state.eventCreate.event);
	const selectedExhibit = useAppSelector((state) => state.selectedExhibit.exhibit);
	const selectedPage = useAppSelector((state) => state.selectedPage.selectedPage)
	const renderPage = () => {
		switch (selectedPageType) {
			case "EventPage":
				return <EventPage data={eventSlice} />;
			case "ExhibitPage":
				return <ChapterPage data={selectedExhibit}/>;
			case "ChapterPage":
				return <ExhibitPage data={selectedPage}/>;
			default:
				return <EventPage data={eventSlice} />;
		}
	};

	return (
		<div>
			<PreviewLayout>{renderPage()}</PreviewLayout>
		</div>
	);
};