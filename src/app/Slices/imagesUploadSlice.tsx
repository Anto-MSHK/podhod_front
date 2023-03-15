import { createSlice, PayloadAction, Action, current } from "@reduxjs/toolkit";
import { type } from "os";

export type imageType = {
  id: string;
  name: string;
  lastModified: number;
  size: number;
  url: string;
};

export type ImagesArrayType = "galleryMainPage";
export type SingleType = "avatarExpo";

type setGalleryType = {
  image: imageType;
  key: ImagesArrayType;
};
type setSingleType = {
  image: imageType;
  key: SingleType;
};
type imagesUploadSliceT = {
  galleryMainPage: imageType[];
  avatarExpo: imageType | undefined;
};
type removeImagesType = {
  id: string;
  key: ImagesArrayType;
};
type removeImageType = {
  id: string;
  key: SingleType;
};
type swapImageType = {
  draggedIndex: number;
  index: number;
  key: ImagesArrayType;
};

const initialState: imagesUploadSliceT = {
  avatarExpo: undefined,
  galleryMainPage: [],
};

const imagesUploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSingle(state, action: PayloadAction<setSingleType>) {
      state[action.payload.key] = action.payload.image;
    },
    setGallery(state, action: PayloadAction<setGalleryType>) {
      state[action.payload.key] = [
        ...state[action.payload.key],
        action.payload.image,
      ];
    },
    removeImage(state, action: PayloadAction<removeImageType>) {
      state[action.payload.key] = undefined;
    },
    removeImages(state, action: PayloadAction<removeImagesType>) {
      state[action.payload.key] = state[action.payload.key].filter(
        (image) => image.id !== action.payload.id
      );
    },
    swapImage(state, action: PayloadAction<swapImageType>) {
      const draggedImage =
        state[action.payload.key][action.payload.draggedIndex];
      state[action.payload.key].splice(action.payload.draggedIndex, 1);
      state[action.payload.key].splice(action.payload.index, 0, draggedImage);
    },
  },
});

export const { setSingle, setGallery, removeImage, removeImages, swapImage } =
  imagesUploadSlice.actions;
export default imagesUploadSlice.reducer;
