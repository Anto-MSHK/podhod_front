import { imageType } from '../Slices/imagesUploadSlice';

export type EventPagesT = {
    id: number;
    name: string;
    description: string;
    visibleLog: boolean;
    eventId: number;
    createdAt: string;
    updatedAt: string;
    gallery: imageType[];
  };

  export type CreateExpoPagePayloadT = {
    name: string,
    description?: string,
    date: string,
    visibleLogo: boolean,
}
  export type UpdateExpoPagePayloadT = {
    name: string,
    description: string,
    visibleLogo: boolean;
  }