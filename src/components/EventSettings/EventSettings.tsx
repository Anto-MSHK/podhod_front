import React from "react";
import { PriceForm } from "../PriceForm/PriceForm";
import { useParams } from "react-router-dom";

const EventSettings = () => {
	const { id } = useParams();

	return (
		<div>
			<PriceForm eventId={id}/>
		</div>
	);
};

export default EventSettings;