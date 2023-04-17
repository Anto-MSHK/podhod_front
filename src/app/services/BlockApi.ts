import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventPagesT } from "../Types/EventPageT";

import {
	EventT,
	EventStateResponse,
	ImgT,
	CreateEventPayloadT,
} from "../Types/EventsT";

type ChapterT = {
    title: string
}
type AddEventReqT = {
    chapterId: string,
    body: ChapterT
}




export const blocksApi = createApi({
	reducerPath: "blocks",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	endpoints: builder => ({

		addBlock: builder.mutation<any, AddEventReqT>({
			query: ({chapterId, body}) => ({
				url: `/${chapterId}/block`,
				method: "POST",
				body: body,
			}),
		}),
	}),
});

const {useAddBlockMutation} = blocksApi
