import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type isChapterShownStateT = {
	[key: string]: boolean
}

const initialState: isChapterShownStateT = {};
const isChapterShownSlice = createSlice({
	name: 'isChapterShown',
	initialState,
	reducers: {
		toggleChapter: (state, action: PayloadAction<number>) => {
			const chapterId = action.payload;
			state[chapterId] = !state[chapterId];
		},
	},
});

export const { toggleChapter } = isChapterShownSlice.actions;

export default isChapterShownSlice.reducer;
