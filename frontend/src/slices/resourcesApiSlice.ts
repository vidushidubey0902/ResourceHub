import { apiSlice } from "./apiSlice";
import { RESOURCS_URL, USERS_URL } from "../utils/constants";
import {
  FavoriteResourceRequest,
  AddResourceRatingRequest,
  CreateResourceRequest,
  GetResourcesRequest,
  ReportResourceRequest,
} from "../utils/types";

export const resourcesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createResource: builder.mutation<void, CreateResourceRequest>({
      query: (data) => ({
        url: `${RESOURCS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getResources: builder.query<any, GetResourcesRequest>({
      query: ({ search, sort, filter, pageNumber }) => ({
        url: `${RESOURCS_URL}`,
        method: "GET",
        params: { search, sort, filter, pageNumber },
      }),
    }),
    getResourceById: builder.mutation<any, any>({
      query: (id) => ({
        url: `${RESOURCS_URL}/details/${id}`,
        method: "PUT",
      }),
    }),
    addResourceRating: builder.mutation<void, AddResourceRatingRequest>({
      query: ({ id, rating, comment }) => ({
        url: `${RESOURCS_URL}/${id}/rating`,
        method: "POST",
        body: { rating, comment },
      }),
    }),
    getUserReview: builder.query<void, string>({
      query: (id) => ({
        url: `${RESOURCS_URL}/${id}/get-review`,
        method: "GET",
      }),
    }),
    getLatestComments: builder.query<void, string>({
      query: (id) => ({
        url: `${RESOURCS_URL}/${id}/latest-comments`,
        method: "GET",
      }),
    }),
    addFavoriteResource: builder.mutation<void, FavoriteResourceRequest>({
      query: ({ id }) => ({
        url: `${USERS_URL}/favorites/resources/${id}`,
        method: "POST",
      }),
    }),
    removeFavoriteResource: builder.mutation<void, FavoriteResourceRequest>({
      query: ({ id }) => ({
        url: `${USERS_URL}/favorites/resources/${id}`,
        method: "DELETE",
      }),
    }),
    checkIfResourceFavorited: builder.query<any, FavoriteResourceRequest>({
      query: ({ id }) => ({
        url: `${USERS_URL}/favorites/resources/check/${id}`,
        method: "GET",
      }),
    }),
    reportResource: builder.mutation<void, ReportResourceRequest>({
      query: (data) => ({
        url: `${RESOURCS_URL}/report`,
        method: "POST",
        body: data,
      }),
    }),
    getFavoriteResources: builder.query<any, void>({
      query: () => ({
        url: `${USERS_URL}/favorites/resources`,
        method: "GET",
      }),
    }),
    getTrending: builder.query<any, void>({
      query: () => ({
        url: `${RESOURCS_URL}/top/monthly`,
        method: "GET",
      }),
    }),
    updateResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `${RESOURCS_URL}/${id}/modify`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourcesQuery,
  useGetResourceByIdMutation,
  useAddResourceRatingMutation,
  useGetUserReviewQuery,
  useGetLatestCommentsQuery,
  useAddFavoriteResourceMutation,
  useRemoveFavoriteResourceMutation,
  useCheckIfResourceFavoritedQuery,
  useReportResourceMutation,
  useGetFavoriteResourcesQuery,
  useGetTrendingQuery,
  useUpdateResourceMutation,
} = resourcesApiSlice as any;
