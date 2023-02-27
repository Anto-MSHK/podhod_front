import { createSlice, PayloadAction, Action, current } from '@reduxjs/toolkit';
import { type } from 'os';



export type imageType = {
  id: string,
  name: string,
  lastModified: number,
  size: number,
  url: string,
}

type imagesUploadSliceT = {
  uploadedImages: imageType[];
}
type swapImageType = {
  draggedIndex: number,
  index: number
}

const initialState: imagesUploadSliceT = {
  uploadedImages: []
}



const imagesUploadSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<imageType>) {
      state.uploadedImages = [...state.uploadedImages, action.payload]
    },
    removeImage(state, action: PayloadAction<string>) {
      state.uploadedImages = state.uploadedImages.filter(image => image.id !== action.payload)
    },
    swapImage(state, action: PayloadAction<swapImageType>) {
      const draggedImage = state.uploadedImages[action.payload.draggedIndex]
      state.uploadedImages.splice(action.payload.draggedIndex,1)
      state.uploadedImages.splice(action.payload.index,0,draggedImage)
    }
  },
})

export const { setImage, removeImage, swapImage } = imagesUploadSlice.actions
export default imagesUploadSlice.reducer 