

type PriceT = {
    id: number,
    criterion: string,
    price: number,
    eventId: number,
    createdAt: Date,
    updateAt: Date,
}


export type EventT = {
    id: number,
    name: string,
    description: string,
    date: Date,
    ageLimit: number | null,
    status: string,
    createdAt: Date,
    updateAt: Date,
    prices: PriceT[]
}
export type EventStateResponse = {
    status: string,
    result: EventT[]
}
export type ImgT = {
    id: number,
    description: string,
    path: string
}
export type EventPagesT = {
    id: 1,
    name: string,
    description: null,
    visibleLog: true,
    eventId: 1,
    createdAt: Date,
    updatedAt: Date,
    imgs: ImgT[]
}
export type ImageResponseT = {
    status: string,
    result: ImgT
}
