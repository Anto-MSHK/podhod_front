import { type } from "os";

type PriceT = {
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
export type EventPagesT = {
  id: 1;
  name: string;
  description: null;
  visibleLog: true;
  eventId: 1;
  createdAt: string;
  updatedAt: string;
  imgs: ImgT[];
};
export type ImageResponseT = {
  status: string;
  result: ImgT;
};
