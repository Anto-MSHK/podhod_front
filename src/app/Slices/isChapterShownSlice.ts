import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type isChapterShownStateT = {
	[key: string]: boolean;
};

const initialState: isChapterShownStateT = {};
const isChapterShownSlice = createSlice({
	name: "isChapterShown",
	initialState,
	reducers: {
		toggleChapter: (state, action: PayloadAction<number | undefined>) => {
			if (!action.payload) {
				for (const [key, value] of Object.entries(state)) {
					state[key] = false;
				}
			} else {
				const chapterId = action.payload;
				for (const [key, value] of Object.entries(state)) {
					if (+chapterId !== +key) state[key] = false;
				}
				state[chapterId] = !state[chapterId];
			}
		},
	},
});

export const { toggleChapter } = isChapterShownSlice.actions;

export default isChapterShownSlice.reducer;
