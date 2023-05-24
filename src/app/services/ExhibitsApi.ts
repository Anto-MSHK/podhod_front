import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	exhibitsT,
	CreateExhibitPayloadT,
	UpdateExhibitPayloadT,
} from "../Types/ExhibitsT";
import { number } from "yup";

type UpdateExhibitReqT = {
	id: string;
	body: UpdateExhibitPayloadT;
	eventId: string;
};

type AddExhibitReqT = {
	body: CreateExhibitPayloadT;
	eventId: string;
};

type DeleteExhibitReqT = {
	id: string;
	eventId: string;
};

export const exhibitsApi = createApi({
	reducerPath: "exhibits",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Pages"],
	endpoints: builder => ({
		fetchExhibits: builder.query<exhibitsT[], any>({
			query: (id: string) => ({
				url: `/${id}/showpieces`,
			}),
			transformResponse: (response: any) => response && response.sort((a: exhibitsT, b: exhibitsT) => Number(a.id) - Number(b.id)),
			providesTags: result =>
				result
					? [
						...result.map(({ id }: any) => ({ type: "Pages", id } as const)),
						{ type: "Pages", id: "LIST" },
					]
					: [{ type: "Pages", id: "LIST" }],
		}),


		addExhibit: builder.mutation<null, AddExhibitReqT>({
			query: ({ eventId, body }) => ({
				url: `/${eventId}/showpieces`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: [{ type: "Pages", id: "LIST" }],
		}),
		updateExhibit: builder.mutation<null, UpdateExhibitReqT>({
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
		}),
	}),
});

export const {
	useFetchExhibitsQuery,
	useAddExhibitMutation,
	useUpdateExhibitMutation,
	useDeleteExhibitMutation,
} = exhibitsApi;
