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

export type ImagesArrayType = "galleryImgBlock";
export type SingleType = "avatarExpo";

type imagesUploadSliceT = {
	galleryImgBlock: imageType[];
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

export const avatarExpoUploadImg = createAsyncThunk(
	"images/uploadEventImg",
	async ({ path, formData }: any, thunkAPI) => {
		const response = await $api.post(path, formData);
		response.data.img.path = API_URL + "/" + response.data.img.path;

		return response.data.img;
	},
);

export const imgBlockUploadImg = createAsyncThunk(
	"images/uploadBlockImg",
	async ({ path, formData }: any, thunkAPI) => {
		const response = await $api.post(path, formData);
		response.data.imgs.map((img: any) => {
			img.path = API_URL + "/" + img.path;
			return img;
		});
		return response.data.imgs;
	},
);

export const imgBlockDeleteImg = createAsyncThunk(
	"images/deleteBlockImg",
	async (path: string, thunkAPI) => {
		await $api.delete(path);
	},
);
export const avatarExpoDeleteImg = createAsyncThunk(
	"images/deleteEventImg",
	async (path: string, thunkAPI) => {
		await $api.delete(path);
	},
);

const initialState: imagesUploadSliceT = {
	avatarExpo: undefined,
	galleryImgBlock: [],
};

const imagesUploadSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		deleteImgInImgBlock(state) {
			state.galleryImgBlock = [];
		},
	},
	extraReducers: builder => {
		builder.addCase(getEventImg.fulfilled, (state, action) => {
			if (action.payload === null) state.avatarExpo = undefined;
			else state.avatarExpo = action.payload;
		});
		builder.addCase(avatarExpoUploadImg.fulfilled, (state, action) => {
			state.avatarExpo = action.payload;
		});
		builder.addCase(avatarExpoDeleteImg.fulfilled, (state, action) => {
			state.avatarExpo = undefined;
		});
		builder.addCase(imgBlockUploadImg.fulfilled, (state, action) => {
			state.galleryImgBlock = action.payload;
		});
	},
});

export const { deleteImgInImgBlock } = imagesUploadSlice.actions;
export default imagesUploadSlice.reducer;
