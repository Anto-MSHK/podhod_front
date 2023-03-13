import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type exhibitForm = {
    exhibitName: string;
    exhibitShort: string;
    exhibitDescription: string;
}


type imagesUploadSliceT = {
    exhibit: exhibitForm | undefined;
}


const initialState: imagesUploadSliceT = {
    exhibit: undefined
}


const ExhibitCreateSlice = createSlice({
    name: 'exhibitCreate',
    initialState,
    reducers: {
        setExhibit(state, action: PayloadAction<exhibitForm>) {
            state.exhibit = action.payload
        },

    },
})

export const { setExhibit } = ExhibitCreateSlice.actions
export default ExhibitCreateSlice.reducer