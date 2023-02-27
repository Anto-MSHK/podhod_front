import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
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
  counter: number,
  id: string
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
      if (state.uploadedImages.length >= action.payload.counter) {
        let curImageIndex = state.uploadedImages.findIndex((image) => image.id === action.payload.id)
        let curImage = state.uploadedImages[curImageIndex]
        let replacedImage = state.uploadedImages[curImageIndex + action.payload.counter]
        let replacedImageIndex = state.uploadedImages.findIndex((image) => image.id === replacedImage.id)
        console.log('state');
        console.log(action.payload.counter);
        console.log({...curImage});
        console.log({...replacedImage});
        console.log(curImageIndex);
        console.log(replacedImageIndex);
        console.log('----');
        state.uploadedImages[curImageIndex] = replacedImage
        state.uploadedImages[replacedImageIndex] = curImage
        
      }

    }
  },
})

export const { setImage, removeImage, swapImage } = imagesUploadSlice.actions
export default imagesUploadSlice.reducer 