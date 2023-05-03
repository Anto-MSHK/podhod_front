import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { exhibitsT } from '../../app/Types/ExhibitsT';

export interface SelectedExhibitState {
	exhibit: exhibitsT | null;
}

const initialState: SelectedExhibitState = {
	exhibit: null,
};

export const selectedExhibitSlice = createSlice({
	name: 'selectedExhibit',
	initialState,
	reducers: {
		setSelectedExhibit: (state, action: PayloadAction<exhibitsT | null>) => {
			state.exhibit = action.payload;
		},
		clearSelectedExhibit: (state) => {
			state.exhibit = null;
		},
	},
});

export const { setSelectedExhibit, clearSelectedExhibit } = selectedExhibitSlice.actions;

export default selectedExhibitSlice.reducer;