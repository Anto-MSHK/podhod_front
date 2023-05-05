import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventPagesT } from "../Types/EventPageT";
interface SelectedPageState {
	selectedPage: EventPagesT | null;
}

const initialState: SelectedPageState = {
	selectedPage: null,
};
const selectedPageSlice = createSlice({
	name: "selectedPage",
	initialState,
	reducers: {
		setSelectedPage: (state, action: PayloadAction<EventPagesT>) => {
			state.selectedPage = action.payload;
		},
		clearSelectedPage: (state) => {
			state.selectedPage = null;
		},
	},
});
export const { setSelectedPage, clearSelectedPage } = selectedPageSlice.actions;

export default selectedPageSlice.reducer;
