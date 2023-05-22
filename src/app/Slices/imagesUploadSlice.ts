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

export type ImagesArrayType = "galleryImgBlock" | 'galleryPageImgs';
export type SingleType = "avatarExpo";

type imagesUploadSliceT = {
	galleryImgBlock: imageType[];
	avatarExpo: imageType | undefined;
	galleryPageImgs: imageType[];
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


export const uploadPageImgs = createAsyncThunk(
	"images/uploadPageImgs",
	async ({ path, formData }: any, thunkAPI) => {
		const response = await $api.post(path, formData);
		response.data.imgs.map((img: any) => {
			img.path = API_URL + "/" + img.path;
			return img;
		});
		return response.data.imgs;
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

export const uploadPageImgDelete = createAsyncThunk(
	"images/uploadPageImgDelete",
	async (id: number, thunkAPI) => {
		const path = `/img/${id}`;
		await $api.delete(path);
		return id;
	},
);


export const imgBlockDeleteImg = createAsyncThunk(
	"images/deleteBlockImg",
	async (id: number, thunkAPI) => {
		const path = `/img/${id}`;
		await $api.delete(path);
		return id;
	},
);
export const avatarExpoDeleteImg = createAsyncThunk(
	"images/deleteEventImg",
	async (id: number, thunkAPI) => {
		const path = `/img/${id}`;
		await $api.delete(path);
		return id;
	},
);

const initialState: imagesUploadSliceT = {
	avatarExpo: undefined,
	galleryImgBlock: [],
	galleryPageImgs:[],
};

const imagesUploadSlice = createSlice({
	name: "images",
	initialState,
	reducers: {
		deleteImgInImgBlock(state) {
			state.galleryImgBlock = [];
		},
		
		replaceImgInImgBlock(state, action) {
			state.galleryImgBlock = action.payload
		},

		deleteImgInPage(state) {
			state.galleryPageImgs = [];
		},

		replaceImgInPage(state, action) {
			state.galleryPageImgs = action.payload
		}
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
		builder.addCase(uploadPageImgDelete.fulfilled, (state, action: PayloadAction<number>) => {
			state.galleryPageImgs = state.galleryPageImgs.filter(img => img.id !== action.payload);
		});
		builder.addCase(imgBlockDeleteImg.fulfilled, (state, action: PayloadAction<number>) => {
			state.galleryImgBlock = state.galleryImgBlock.filter(img => img.id !== action.payload);
		});
		builder.addCase(imgBlockUploadImg.fulfilled, (state, action) => {
			state.galleryImgBlock = action.payload;
		});
		builder.addCase(uploadPageImgs.fulfilled, (state, action) => {
			state.galleryPageImgs = action.payload;
		});

	},
});

export const { deleteImgInImgBlock, replaceImgInImgBlock, replaceImgInPage, deleteImgInPage } = imagesUploadSlice.actions;
export default imagesUploadSlice.reducer;
