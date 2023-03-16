import { createSlice, PayloadAction, Action, current } from "@reduxjs/toolkit";

export type eventForm = {
    eventName: string;
    description: string;
    age: string | null;
    eventType: string;
};

export type pageForm = {
    pageTitle: string;
    description: string;
};

type imagesUploadSliceT = {
    event: eventForm | undefined;
    page: pageForm | undefined;
};

const initialState: imagesUploadSliceT = {
    event: undefined,
    page: undefined,
};

const ExpoCreateSlice = createSlice({
    name: "eventCreate",
    initialState,
    reducers: {
        setEvent(state, action: PayloadAction<eventForm>) {
            state.event = action.payload;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    },
});

export const { setEvent, setPage } = ExpoCreateSlice.actions;
export default ExpoCreateSlice.reducer;
