import { createSlice, PayloadAction, Action, current } from '@reduxjs/toolkit';
import { type } from 'os';



export type imageType = {
  id: string,
  name: string,
  lastModified: number,
  size: number,
  url: string,
}

export type ImagesArrayType = 'galleryImages' | 'backGroundImages'
type setImageType = {
  image: imageType,
  key: ImagesArrayType
}
type imagesUploadSliceT = {
  galleryImages: imageType[];
  backGroundImages: imageType[];
}
type removeImageType = {
  id: string,
  key: ImagesArrayType
}
type swapImageType = {
  draggedIndex: number,
  index: number,
  key:  ImagesArrayType
}

const initialState: imagesUploadSliceT = {
  galleryImages: [],
  backGroundImages: [],
}



const imagesUploadSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<setImageType>) {
      state[action.payload.key] = [...state[action.payload.key], action.payload.image]
    },
    removeImage(state, action: PayloadAction<removeImageType>) {
      state[action.payload.key] = state[action.payload.key].filter(image => image.id !== action.payload.id)
    },
    swapImage(state, action: PayloadAction<swapImageType>) {
      const draggedImage = state[action.payload.key][action.payload.draggedIndex]
      state[action.payload.key].splice(action.payload.draggedIndex,1)
      state[action.payload.key].splice(action.payload.index,0,draggedImage)
    }
  },
})

export const { setImage, removeImage, swapImage } = imagesUploadSlice.actions
export default imagesUploadSlice.reducer 