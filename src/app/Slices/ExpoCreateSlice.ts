import { createSlice, PayloadAction, Action, current } from "@reduxjs/toolkit";
import { type } from "os";
import { EventEdit } from "../../pages/EventEdit/EventEdit";

export type eventForm = {
	eventName: string;
	description: string;
	age: string | null;
	eventType: string;
};

type imagesUploadSliceT = {
	event: eventForm | undefined;
};

const initialState: imagesUploadSliceT = {
	event: undefined,
};

const ExpoCreateSlice = createSlice({
	name: "eventCreate",
	initialState,
	reducers: {
		setEvent(state, action: PayloadAction<eventForm>) {
			state.event = action.payload;
		},
	},
});

export const { setEvent } = ExpoCreateSlice.actions;
export default ExpoCreateSlice.reducer;
