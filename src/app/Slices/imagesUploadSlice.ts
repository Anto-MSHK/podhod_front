import {
	createSlice,
	PayloadAction,
	Action,
	current,
	createAction,
	createAsyncThunk,
} from "@reduxjs/toolkit";
import { type } from "os";
import { $api, API_URL } from "../http";

export type imageType = {
	id: number;
	description: string;
	path: string;
	eventId: number;
};

export type ImagesArrayType = "galleryMainPage";
export type SingleType = "avatarExpo";

type imagesUploadSliceT = {
	galleryMainPage: imageType[];
	avatarExpo: imageType | undefined;
};

export const getEventImg = createAsyncThunk(
	"images/getEventImg",
	async (eventId: number, thunkAPI) => {
		const response = await $api.get(`/events/${eventId}`);
		response.data.img.path = API_URL + "/" + response.data.img.path;
		return response.data.img;
	},
);

export const uploadEventImg = createAsyncThunk(
	"images/uploadEventImg",
	async ({ path, formData }: any, thunkAPI) => {
		const response = await $api.post(path, formData);
		response.data.img.path = API_URL + "/" + response.data.img.path;

		return response.data.img;
	},
);

export const deleteEventImg = createAsyncThunk(
	"images/deleteEventImg",
	async (path: string, thunkAPI) => {
		await $api.delete(path);
	},
);

const initialState: imagesUploadSliceT = {
	avatarExpo: undefined,
	galleryMainPage: [],
};

const imagesUploadSlice = createSlice({
	name: "images",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getEventImg.fulfilled, (state, action) => {
			if (action.payload === null) state.avatarExpo = undefined;
			else state.avatarExpo = action.payload;
		});
		builder.addCase(uploadEventImg.fulfilled, (state, action) => {
			state.avatarExpo = action.payload;
		});
		builder.addCase(deleteEventImg.fulfilled, (state, action) => {
			state.avatarExpo = undefined;
		});
	},
});

export const {} = imagesUploadSlice.actions;
export default imagesUploadSlice.reducer;
