

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