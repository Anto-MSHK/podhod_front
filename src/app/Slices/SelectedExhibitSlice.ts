import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { exhibitsT } from '../../app/Types/ExhibitsT';
import { chaptersApi } from '../services/ChapterApi';

export interface SelectedExhibitState {
	exhibit: exhibitsT | null;
	exhibits: exhibitsT[];
}

const initialState: SelectedExhibitState = {
	exhibit: null,
	exhibits: [],
};

export const selectedExhibitSlice = createSlice({
	name: 'selectedExhibit',
	initialState,
	reducers: {
		setSelectedExhibit: (state, action: PayloadAction<exhibitsT | null>) => {
			state.exhibit = action.payload;
		},
		setExhibits: (state, action: PayloadAction<exhibitsT[]>) => {
			state.exhibits = action.payload;
		},
		clearSelectedExhibit: (state) => {
			state.exhibit = state.exhibits.length ? state.exhibits[0] : null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(chaptersApi.endpoints.fetchChapters.matchFulfilled, (state, { payload }) => {
				state.exhibit = payload;
			});
	},
});

export const { setSelectedExhibit, clearSelectedExhibit, setExhibits } = selectedExhibitSlice.actions;

export default selectedExhibitSlice.reducer;

export const selectNextExhibit = createSelector(
	(state: RootState) => state.selectedExhibit,
	(selectedExhibitState) => {
		const currentIndex = selectedExhibitState.exhibits.findIndex(e => e.id === selectedExhibitState.exhibit?.id);
		if (currentIndex >= 0 && currentIndex < selectedExhibitState.exhibits.length - 1) {
			return selectedExhibitState.exhibits[currentIndex + 1];
		} else if (currentIndex === selectedExhibitState.exhibits.length - 1) {
			return selectedExhibitState.exhibits[0];
		} else {
			return null;
		}
	}
);
