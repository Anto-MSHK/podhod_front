import { createSlice, PayloadAction } from '@reduxjs/toolkit';



type imageType = {
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
    },
  })

  export const {setImage} = imagesUploadSlice.actions 
export default imagesUploadSlice.reducer 