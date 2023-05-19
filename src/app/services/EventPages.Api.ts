import { UpdateExpoPagePayloadT } from "./../Types/EventPageT";
import { API_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventPagesT, CreateExpoPagePayloadT } from "../Types/EventPageT";

type AddExpoPageReqT = {
	eventId: string;
	body: CreateExpoPagePayloadT;
};

type UpdateExpoPageReq = {
	id: string;
	eventId: string;
	body: UpdateExpoPagePayloadT;
};
type DeleteExpoPageReq = {
	id: string;
	eventId: string;
};

export const eventPagesApi = createApi({
	reducerPath: "pages",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Pages"],
	endpoints: builder => ({
		fetchPage: builder.query<EventPagesT[], any>({
			query: (id: string) => ({
				url: `/${id}/pages`,
			}),
			transformResponse: (response: EventPagesT[]) => {
				return response.sort((a, b) => Number(a.id) - Number(b.id));
			},
			providesTags: result =>
				result
					? [
							...result.map(({ id }: any) => ({ type: "Pages", id } as const)),
							{ type: "Pages", id: "LIST" },
					  ]
					: [{ type: "Pages", id: "LIST" }],
		}),

		addPage: builder.mutation<null, AddExpoPageReqT>({
			query: ({ body, eventId }) => ({
				url: `/${eventId}/pages`,
				method: "POST",
				body,
			}),
			invalidatesTags: [{ type: "Pages", id: "LIST" }],
		}),
		updatePage: builder.mutation<null, UpdateExpoPageReq>({
			query: ({ id, body, eventId }) => ({
				url: `/${eventId}/pages/${id}`,
				method: "PUT",
				body,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Pages", id }],
		}),
		deletePage: builder.mutation<null, DeleteExpoPageReq>({
			query: ({ id, eventId }) => ({
				url: `/${eventId}/pages/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (result, error, id) => [{ type: "Pages", id: "LIST" }],
		}),
	}),
});

export const {
	useFetchPageQuery,
	useAddPageMutation,
	useDeletePageMutation,
	useUpdatePageMutation,
} = eventPagesApi;
