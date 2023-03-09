import { API_URL } from '../http';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventT, EventStateResponse, EventPagesT, ImgT, CreateEventPayloadT } from '../Types/EventsT';


export const eventsApi = createApi({
    reducerPath: "events",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
    }),
    endpoints: (builder) => ({
        fetchEvents: builder.query<EventT[], void>({
            query: () => ({
                url: `/events`,
            }),
        }),
        getEventPages: builder.query<EventPagesT[], number>({
            query: (eventId: number) => ({
                url: `/${eventId}/pages`,
            }),
        }),
        getPageImg: builder.query<string, string>({
            query: (path: string) => ({
                url: `/${path}`,
            }),
        }),
        addEvent: builder.mutation<EventT, CreateEventPayloadT >({
            query: (data) => ({
                url: `/events`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useFetchEventsQuery, useGetEventPagesQuery, useGetPageImgQuery, useAddEventMutation } = eventsApi;
