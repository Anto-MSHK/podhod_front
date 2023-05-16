import { PricesT, PriceT, UpdateEventTimes } from "./../Types/EventsT";
import { API_URL } from "../http";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { EventPagesT } from "../Types/EventPageT";

import {
	EventT,
	EventStateResponse,
	ImgT,
	CreateEventPayloadT,
	UpdateEventPayloadT,
	UpdateEventCalendarPayload,
} from "../Types/EventsT";

export const eventsApi = createApi({
	reducerPath: "events",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	tagTypes: ["Price"],
	endpoints: builder => ({
		fetchEvents: builder.query<EventT[], void>({
			query: () => ({
				url: `/events`,
				sortComparer: (a: EventT, b: EventT) => a.id - b.id,
			}),
		}),
		fetchEvent: builder.query<EventT, any>({
			query: (id: string) => ({
				url: `/events/${id}`,
				sortComparer: (a: EventT, b: EventT) => a.id - b.id,
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
		addEvent: builder.mutation<EventT, CreateEventPayloadT>({
			query: data => ({
				url: `/events`,
				method: "POST",
				body: data,
			}),
		}),
		updateEvent: builder.mutation<EventT, UpdateEventPayloadT>({
			query: data => ({
				url: `/events/${data.id}`,
				method: "PATCH",
				body: data,
			}),
		}),
		updateEventCalendar: builder.mutation<EventT, UpdateEventCalendarPayload>({
			query: data => ({
				url: `/events/${data.id}/times/calendar`,
				method: "PATCH",
				body: data.body,
			}),
		}),
		updateEventTimes: builder.mutation<EventT, UpdateEventTimes>({
			query: data => ({
				url: `/events/${data.id}/times`,
				method: "PATCH",
				body: data.body,
				params: {
					sort: "id"
				}
			}),
		}),
		updatePrices: builder.mutation<PriceT, { id: string; prices: PricesT[] }>({
			query: ({ id, prices }) => ({
				url: `/events/${id}/prices`,
				method: "PATCH",
				body: prices,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: "Price", id }],
		}),
	}),
});

export const {
	useFetchEventsQuery,
	useFetchEventQuery,
	useGetEventPagesQuery,
	useGetPageImgQuery,
	useAddEventMutation,
	useUpdateEventMutation,
	useUpdateEventCalendarMutation,
	useUpdateEventTimesMutation,
	useUpdatePricesMutation,
} = eventsApi;
