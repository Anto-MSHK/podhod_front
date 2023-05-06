
import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventPagesT } from "../Types/EventPageT";

import {
	EventT,
	EventStateResponse,
	ImgT,
	CreateEventPayloadT,
} from "../Types/EventsT";

type BlockT = {
	id?: string,
    title: string,
	type: string,
	content: {
		description: string,
	}
}
type AddBlockReqT = {
    chapterId: string,
    body: BlockT,
}




export const blocksApi = createApi({
	reducerPath: "blocks",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	endpoints: builder => ({

		addBlock: builder.mutation<any, AddBlockReqT>({
			query: ({chapterId, body}) => ({
				url: `/${chapterId}/block`,
				method: "POST",
				body: body,
			}),
		}),
	}),
});

export const {useAddBlockMutation} = blocksApi