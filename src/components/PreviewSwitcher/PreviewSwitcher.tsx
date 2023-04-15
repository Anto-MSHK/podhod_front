import React from "react";
import { EventPage } from "../../pages/MobilePreview/EventPage/EventPage";
import { ExhibitPage } from "../../pages/MobilePreview/ExhibitPage/ExhibitPage";
import { ChapterPage } from "../../pages/MobilePreview/ChapterPage/ChapterPage";
import { PreviewLayout } from "../PreviewLayout/PreviewLayout";
export const PreviewSwitcher = () => {

	let type = 'EventPage'

	const renderPage = () => {
		switch (type) {
			case 'EventPage':
				return <EventPage />;
			case 'ExhibitPage':
				return <ExhibitPage />;
			case 'ChapterPage':
				return <ChapterPage />;
			default:
				return <EventPage />;
		}
	};

	return (
		<div>
			<PreviewLayout>{renderPage()}</PreviewLayout>
		</div>
	);
};