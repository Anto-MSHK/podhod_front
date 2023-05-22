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

type UpdateBlockReqT = {
	chapterId: string,
	blockId: string,
	body: {
		title: string,
		content: {
		  description: string,
		  withAudio?: boolean,
		}
	  }
}

export type AddChapterReqT = {
	body: {
		title: string;
		description: string;
	};
	eventId: string;
	showpieceId: string;
};
export type UpdateChapterReqT = {
	body: {
		title: string;
		description: string;
	};
	eventId: string;
	showpieceId: string;
	chapterId: string;
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
		
		updateChapter: builder.mutation<null, UpdateChapterReqT>({
			query: ({ eventId, body, showpieceId, chapterId}) => ({
				url: `/${eventId}/showpieces/${showpieceId}/chapter/${chapterId}`,
				method: "PUT",
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
		updateBlock: builder.mutation<null, UpdateBlockReqT>({
			query: ({ body, chapterId, blockId }) => ({
				url: `/${chapterId}/block/${blockId}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: ['Chapters'],
		}),
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
	useUpdateChapterMutation,
	useDeleteChapterMutation,
	useDeleteBlockMutation,
	useUpdateBlockMutation,
} = chaptersApi;
