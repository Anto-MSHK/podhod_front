import React from "react";
import { EventPreview } from "../../pages/MobilePreview/EventPreview/EventPreview";
import { PagesPreview } from "../../pages/MobilePreview/PagesPreview/PagesPreview";
import { ExhibitsPreview } from "../../pages/MobilePreview/ExhibitsPreview/ExhibitsPreview";
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
			case "EventPreview":
				return <EventPreview data={eventSlice} />;
			case "PagesPreview":
				return <PagesPreview data={selectedPage}/>;
			case "ExhibitsPreview":
				return <ExhibitsPreview data={selectedExhibit}/>;
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