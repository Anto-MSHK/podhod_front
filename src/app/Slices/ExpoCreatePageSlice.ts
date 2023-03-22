import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageType } from './imagesUploadSlice';


export type pageForm = {
    pageName: string;
    pageDescription: string;
    visibleLogo: boolean;
    gallary?: imageType[];
    background?: imageType;
}


type pagesUploadSliceT = {
    page: pageForm | undefined;
}


const initialState: pagesUploadSliceT = {
    page: undefined
}


const ExpoCreatePage = createSlice({
    name: 'pageCreate',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<pageForm>) {
            state.page = action.payload
        },

    },
})

export const { setPage } = ExpoCreatePage.actions
export default ExpoCreatePage.reducer