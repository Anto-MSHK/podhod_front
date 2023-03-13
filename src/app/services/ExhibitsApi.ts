import { API_URL } from '../http';

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { exhibitsT } from '../Types/ExhibitsT';


export const exhibitsApi = createApi({
    reducerPath: "exhibits",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
    }),
    endpoints: (builder) => ({
        fetchExhibits: builder.query<exhibitsT[], void>({
            query: () => ({
                url: `/25/showpieces`,
            }),
        }),
        addExhibit: builder.mutation({
            query: (data) => ({
                url: `/25/showpieces`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useFetchExhibitsQuery, useAddExhibitMutation } = exhibitsApi;
