import React, { FC } from "react";
import { Gallery } from "../../Gallery/Gallery";
import { ImgBlockT } from "../../../app/Types/ChapterT";

interface ImgBlockI {
	imgs: ImgBlockT["imgs"];
}
export const ImgBlock: FC<ImgBlockI> = ({ imgs }) => {
	const images = imgs.map(img => {
		return {
			src: "http://194.67.121.107:5000/" + img.path,
			alt: img.description,
		};
	});
	return (
		<div
			style={{
				height: "100%",
				overflowY: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Gallery images={images} isDisabled />
		</div>
	);
};
