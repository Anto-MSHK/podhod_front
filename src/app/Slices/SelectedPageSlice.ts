import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventPagesT } from "../Types/EventPageT";
import { exhibitsT } from "../Types/ExhibitsT";
interface SelectedPageState {
	selectedPage: EventPagesT | null;
	pages: EventPagesT[];

}

const initialState: SelectedPageState = {
	selectedPage: null,
	pages: [],
};
export const selectedPageSlice = createSlice({
	name: "selectedPage",
	initialState,
	reducers: {
		setSelectedPage: (state, action: PayloadAction<EventPagesT>) => {
			state.selectedPage = action.payload;
		},
		clearSelectedPage: (state) => {
			state.selectedPage = null;
		},
		setPages: (state, action: PayloadAction<EventPagesT[]>) => {
			state.pages = action.payload;
		},
	},
});
export const { setSelectedPage, clearSelectedPage, setPages } = selectedPageSlice.actions;

export default selectedPageSlice.reducer;
