import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	exhibitsT,
	CreateExhibitPayloadT,
	UpdateExhibitPayloadT,
} from "../Types/ExhibitsT";
import { ChapterT } from "../Types/ChapterT";



type GetChaptersReqT= {
    eventId:string,
    showpieceId: string,
}

type UpdateExhibitReqT = {
	id: string;
	body: UpdateExhibitPayloadT;
	eventId: string;
};

export type AddChapterReqT = {
	body: {
        title: string,
        description: string,
    };
    eventId:string,
    showpieceId: string,
};

type DeleteExhibitReqT = {
	id: string;
	eventId: string;
};

export const chaptersApi = createApi({
	reducerPath: "chapters",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Chapters"],
	endpoints: builder => ({
		fetchChapters: builder.query<exhibitsT, GetChaptersReqT>({
			query: ({eventId, showpieceId}) => ({
				url: `/${eventId}/showpieces/${showpieceId}`,
			}),

		}),

		addChapter: builder.mutation<null, AddChapterReqT>({
			query: ({ eventId, body, showpieceId }) => ({
				url: `/${eventId}/showpieces/${showpieceId}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: [{ type: "Chapters", id: "LIST" }],
		}),
		/* updateExhibit: builder.mutation<null, UpdateExhibitReqT>({
			query: ({ body, eventId, id }) => ({
				url: `/${eventId}/showpieces/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Pages", id }],
		}),
		deleteExhibit: builder.mutation<null, DeleteExhibitReqT>({
			query: ({ id, eventId }) => ({
				url: `/${eventId}/showpieces/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Pages", id: "LIST" }],
		}), */
	}),
});

export const {
	useFetchChaptersQuery,
    useAddChapterMutation,
} = chaptersApi;
