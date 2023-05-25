import React, { FC } from "react";
import { Gallery } from "../../Gallery/Gallery";
import { ImgBlockT } from "../../../app/Types/ChapterT";
import { API_URL } from "../../../app/http";

interface ImgBlockI {
	imgs: ImgBlockT["imgs"];
}
export const ImgBlock: FC<ImgBlockI> = ({ imgs }) => {
	const images = imgs.map(img => {
		return {
			src: API_URL + img.path,
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
			{images.length > 0 ? (
				<Gallery images={images} isDisabled />
			) : (
				<h5>пока нет картинок</h5>
			)}
		</div>
	);
};
