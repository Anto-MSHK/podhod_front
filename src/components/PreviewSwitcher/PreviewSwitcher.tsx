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

	const renderPage = () => {
		switch (selectedPageType) {
			case "EventPage":
				return <EventPage data={eventSlice} />;
			case "ExhibitPage":
				return <ExhibitPage />;
			case "ChapterPage":
				return <ChapterPage />;
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