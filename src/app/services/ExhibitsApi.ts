import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { exhibitsT } from "../Types/ExhibitsT";

export const exhibitsApi = createApi({
  reducerPath: "exhibits",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
  }),
  tagTypes: ["Exhibits"],
  endpoints: (builder) => ({
    fetchExhibits: builder.query<exhibitsT[], any>({
      query: (id: string) => ({
        url: `/${id}/showpieces`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }: any) => ({ type: "Exhibits", id } as const)
              ),
              { type: "Exhibits", id: "LIST" },
            ]
          : [{ type: "Exhibits", id: "LIST" }],
    }),

    addExhibit: builder.mutation({
      query: (data) => ({
        url: `/${data.id}/showpieces`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Exhibits", id: "LIST" }],
    }),
    updateExhibit: builder.mutation<any, any>({
      query: ({ id, data, eventId }) => ({
        url: `/${eventId}/showpieces/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Exhibits", id }],
    }),
    deleteExhibit: builder.mutation<any, any>({
      query: ({ id, eventId }) => ({
        url: `/${eventId}/showpieces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Exhibits", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useFetchExhibitsQuery,
  useAddExhibitMutation,
  useUpdateExhibitMutation,
  useDeleteExhibitMutation,
} = exhibitsApi;
