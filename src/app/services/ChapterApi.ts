import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	exhibitsT,
	CreateExhibitPayloadT,
	UpdateExhibitPayloadT,
} from "../Types/ExhibitsT";
import { ChapterT } from "../Types/ChapterT";
import { EventPagesT } from "../Types/EventPageT";

type GetChaptersReqT = {
	eventId: string;
	showpieceId: string;
};

type UpdateExhibitReqT = {
	id: string;
	body: UpdateExhibitPayloadT;
	eventId: string;
};

export type AddChapterReqT = {
	body: {
		title: string;
		description: string;
	};
	eventId: string;
	showpieceId: string;
};

type DeleteСhapterReqT = {
	id: string;
	eventId: string;
	showpieceId: string;
};
type DeleteBlockReqT = {
	chapterId: string;
	blockId: string;
};

type BlockT = {
	id?: string;
	title: string;
	type: string;
	content: {
		description: string;
	};
};
type AddBlockReqT = {
	chapterId: string;
	body: BlockT;
};

export const chaptersApi = createApi({
	reducerPath: "chapters",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Chapters"],
	endpoints: builder => ({
		fetchChapters: builder.query<exhibitsT, GetChaptersReqT>({
			query: ({ eventId, showpieceId }) => ({
				url: `/${eventId}/showpieces/${showpieceId}`,
			}),
			transformResponse: (response: exhibitsT) => {
				response.chapters?.sort((a, b) => Number(a.id) - Number(b.id));
				return response;
			},
			providesTags: result => [{ type: "Chapters", id: result?.id }],
		}),

		addChapter: builder.mutation<null, AddChapterReqT>({
			query: ({ eventId, body, showpieceId }) => ({
				url: `/${eventId}/showpieces/${showpieceId}`,
				method: "POST",
				body: body,
			}),

			invalidatesTags: ["Chapters"],
		}),

		addBlock: builder.mutation<any, AddBlockReqT>({
			query: ({ chapterId, body }) => ({
				url: `/${chapterId}/block`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Chapters"],
		}),
		/* updateExhibit: builder.mutation<null, UpdateExhibitReqT>({
			query: ({ body, eventId, id }) => ({
				url: `/${eventId}/showpieces/${id}`,
				method: "PUT",
				body,
				params: {
            sort: "id"
        }
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Pages", id }],
		}), */
		deleteChapter: builder.mutation<null, DeleteСhapterReqT>({
			query: ({ id, eventId, showpieceId }) => ({
				url: `/${eventId}/showpieces/${showpieceId}/chapter/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Chapters"],
		}),

		deleteBlock: builder.mutation<null, DeleteBlockReqT>({
			query: ({ chapterId, blockId }) => ({
				url: `/${chapterId}/block/${blockId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Chapters"],
		}),
	}),
});

export const {
	useFetchChaptersQuery,
	useAddBlockMutation,
	useAddChapterMutation,
	useDeleteChapterMutation,
	useDeleteBlockMutation,
} = chaptersApi;
