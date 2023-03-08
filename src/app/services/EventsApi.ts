import { API_URL } from '../http';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventT, EventStateResponse } from '../Types/EventsT';


export const eventsApi = createApi({
    reducerPath: "",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
    }),
    endpoints: (builder) => ({
        fetchEvents: builder.query<EventT[], void>({
            query: () => ({
                url: `/events`,
            }),
        }),
    }),
});

export const { useFetchEventsQuery } = eventsApi;
