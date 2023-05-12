import React, { FC } from "react";
interface TextBlockI {
	description: string;
	withAudio: boolean;
}
export const TextBlock: FC<TextBlockI> = ({ description, withAudio }) => {
	return <div>{description}</div>;
};
