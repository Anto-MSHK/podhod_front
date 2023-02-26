import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';



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
  
  const initialState: imagesUploadSliceT = {
    uploadedImages: []
  }
  


const imagesUploadSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {  
      setImage(state, action: PayloadAction<imageType>){
        state.uploadedImages = [...state.uploadedImages, action.payload]
      },  
      removeImage(state, action: PayloadAction<string>){
        state.uploadedImages = state.uploadedImages.filter(image => image.id !== action.payload)
      }
    },
  })

  export const {setImage, removeImage} = imagesUploadSlice.actions 
export default imagesUploadSlice.reducer 