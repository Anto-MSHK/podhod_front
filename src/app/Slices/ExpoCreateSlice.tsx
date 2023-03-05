import { createSlice, PayloadAction, Action, current } from '@reduxjs/toolkit';
import { type } from 'os';
import { ExpoCreatePage } from '../../pages/ExpoCreatePage/ExpoCreatePage';



export type eventForm = {
    eventName: string;
    description: string;
    age: string;
    eventType: string;
    checked: boolean[];
}

type imagesUploadSliceT = {
    event: eventForm | undefined;
}


const initialState: imagesUploadSliceT = {
    event: undefined
}



const ExpoCreateSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<eventForm>) {
            state.event = action.payload
        },

    },
})

export const { setEvent } = ExpoCreateSlice.actions
export default ExpoCreateSlice.reducer 