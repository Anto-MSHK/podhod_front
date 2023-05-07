import { type } from "os";

export type PricesT =
	{
		criterion: string;
		price: number;
	};

export type PriceT = {
	id?: number;
	criterion: string;
	price: number;
	eventId?: number;
	createdAt?: string;
	updateAt?: Date;
};

export type EventT = {
	id: number;
	name: string;
	description: string;
	date: string;
	ageLimit: string | null;
	status: string;
	createdAt: string;
	updateAt: string;
	prices: PriceT[];
	type: "exhibition" | "fair" | "promo-exhibition";
	img: {
		id: number;
		description: string;
		path: string;
		eventId: number;
	};
};

export type CreateEventPayloadT = {
	name: string;
	description: string;
	date: string;
	type: string;
	ageLimit: string;
	prices: PriceT[];
};

export type UpdateEventPayloadT = {
	id: string;
	name: string;
	description: string;
	date: string;
	type: string;
	ageLimit: string;
};
export type EventStateResponse = {
	status: string;
	result: EventT[];
};
export type ImgT = {
	id: number;
	description: string;
	path: string;
};

export type ImageResponseT = {
	status: string;
	result: ImgT;
};
