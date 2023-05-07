import { API_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	PricesT,
	PriceT,
} from "../Types/EventsT";

export const pricesApi = createApi({
	reducerPath: "prices",
	baseQuery: fetchBaseQuery({
		baseUrl: `${API_URL}`,
	}),
	endpoints: builder => ({
		updatePrices: builder.mutation<PriceT, { id: string, prices: PricesT[] }>({
			query: ({ id, prices }) => ({
				url: `/events/${id}/prices`,
				method: "PATCH",
				body: prices,
			}),
		}),
	}),
});

export const {
useUpdatePricesMutation
} = pricesApi;
