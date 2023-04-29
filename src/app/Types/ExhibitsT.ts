import { ChapterT } from "./ChapterT";

export type exhibitsT = {
	id: string;
	name: string;
	short?: string;
	description?: string;
	chapters?: ChapterT[];
};

export type CreateExhibitPayloadT = {
	name: string;
	short: string;
	description: string;
	date: string;
};

export type UpdateExhibitPayloadT = {
	name: string;
	description: string;
	short: string;
};
