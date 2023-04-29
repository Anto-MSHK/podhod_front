import { imageType } from "../Slices/imagesUploadSlice"

export type ChapterT = {
    id: number,
    title: string,
    description: string,
    blocks: BlockT[],
    createdAt: string,
    updatedAt: string,
}

export type BlockT = {
    id: number,
    title: string,
    type: BlockTypes,
    textBlock: TextBlockT,
    imgBlock: ImgBlockT,
    createdAt: string,
    updatedAt: string,

}

type TextBlockT = {
    id: number,
    description: string,
    withAudio: boolean,
}

type ImgBlockT = {
    id: number,
    imgs: imageType[],
}
type BlockTypes  = 'text' | 'img'