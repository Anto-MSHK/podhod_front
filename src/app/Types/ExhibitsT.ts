export type exhibitsT = {
    id:	number
    name: string
    short?: string
    description?: string
    chapters?: {}[]
}

export type CreateExhibitPayloadT = {
    name: string,
    short: string,
    description: string,
    date: string,
}

export type UpdateExhibitPayloadT = {
    name: string,
    description: string,
}