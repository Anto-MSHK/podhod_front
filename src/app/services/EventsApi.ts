/** @format */

import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    EventT,
    EventStateResponse,
    EventPagesT,
    ImgT,
    CreateEventPayloadT,
    UpdateEventPayloadT
} from "../Types/EventsT";

export const eventsApi = createApi({
    reducerPath: "events",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`
    }),
    endpoints: (builder) => ({
        fetchEvents: builder.query<EventT[], void>({
            query: () => ({
                url: `/events`
            })
        }),
        fetchEvent: builder.query<EventT, any>({
            query: (id: string) => ({
                url: `/events/${id}`
            })
        }),
        getEventPages: builder.query<EventPagesT[], number>({
            query: (eventId: number) => ({
                url: `/${eventId}/pages`
            })
        }),
        getPage: builder.query({
            query: (pageId: number) => ({
                url: `/pages/${pageId}`
            })
        }),
        getPageImg: builder.query<string, string>({
            query: (path: string) => ({
                url: `/${path}`
            })
        }),
        addEvent: builder.mutation<EventT, CreateEventPayloadT>({
            query: (data) => ({
                url: `/events`,
                method: "POST",
                body: data
            })
        }),
        updateEvent: builder.mutation<EventT, UpdateEventPayloadT>({
            query: (data) => ({
                url: `/events/${data.id}`,
                method: "PATCH",
                body: data
            })
        })
    })
});

export const {
    useFetchEventsQuery,
    useFetchEventQuery,
    useGetEventPagesQuery,
    useGetPageImgQuery,
    useAddEventMutation,
    useUpdateEventMutation
} = eventsApi;
