/** @format */

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
    id: number;
    name: string;
    description: null;
    visibleLog: boolean;
    eventId: number;
    createdAt: string;
    updatedAt: string;
    imgs: ImgT[];
};
export type CreateEventPageT = {
    name: string;
    description: string;
    imgs: ImgT[];
    createdAt: string;
};

export type UpdateEventPageT = {
    id: string;
    updatedAt: string;
    name: string;
    description: string;
};

export type ImageResponseT = {
    status: string;
    result: ImgT;
};

/* export type CreateEventsPageT = {
    id: number;
    name: string;
    description: string;
    visibleLogo: boolean;
    imgs: [
        {
            id: 1;
            description: "В Linux для удаления файлов предусмотрена стандартная утилита rm. Как и все остальные, стандартные утилиты в имени rm тоже заложена определенная идея. Это сокращение от английского слова Remove.";
            path: "for_page/based-717611434.jpg";
        }
    ];
    createdAt: "2023-03-08T09:55:14.002Z";
    updatedAt: "2023-03-08T09:55:14.002Z";
};
 */
