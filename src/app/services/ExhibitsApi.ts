import {API_URL} from '../http';

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {exhibitsT} from '../Types/ExhibitsT';


export const exhibitsApi = createApi({
    reducerPath: "exhibits",
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}`,
    }),
    tagTypes: ['Exhibits'],
    endpoints: (builder) => ({
        fetchExhibits: builder.query<exhibitsT[], void>({
            query: () => ({
                url: `/25/showpieces`,
            }),
            providesTags: (result) =>
                result
                    ?
                    [
                        ...result.map(({id}: any) => ({type: 'Exhibits', id} as const)),
                        {type: 'Exhibits', id: 'LIST'},
                    ]
                    :
                    [{type: 'Exhibits', id: 'LIST'}]
        }),
        addExhibit: builder.mutation({
            query: (data) => ({
                url: `/25/showpieces`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{type: 'Exhibits', id: 'LIST'}]
        }),
        updateExhibit: builder.mutation({
            query: ({id, data}) => ({
                url: `/25/showpieces/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Exhibits', id}]
        }),
        deleteExhibit: builder.mutation({
            query: (id) => ({
                url: `/25/showpieces/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{type: 'Exhibits', id: 'LIST'}]
        }),
    }),
});

export const {useFetchExhibitsQuery, useAddExhibitMutation, useUpdateExhibitMutation,useDeleteExhibitMutation} = exhibitsApi;
