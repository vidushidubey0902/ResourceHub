import { apiSlice } from './apiSlice';
import { ROADMAPS_URL } from '../utils/constants';
import { CreateRoadmapProps, GetRoadmapRequest } from '../utils/types';

export const roadmapApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRoadmap: builder.mutation<void, CreateRoadmapProps>({
      query: (data) => ({
        url: `${ROADMAPS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),

    getRoadmap: builder.query<any, GetRoadmapRequest>({
      query: ({ search, sort, filter, pageNumber }) => ({
        url: `${ROADMAPS_URL}`,
        method: 'GET',
        params: { search, sort, filter, pageNumber },
      }),
    }),

    getRoadmapById: builder.query({
      query: (id) => ({
        url: `${ROADMAPS_URL}/${id}`,
        method: 'GET',
      }),
    }),

    // Add a review
    addReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `${ROADMAPS_URL}/${id}/rating`,
        method: 'POST',
        body: review,
      }),
    }),

    // Get latest comments
    getLatestComments: builder.query({
      query: (id) => ({
        url: `${ROADMAPS_URL}/${id}/latest-comments`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateRoadmapMutation,
  useGetRoadmapQuery,
  useGetRoadmapByIdQuery,
  useAddReviewMutation,
  useGetLatestCommentsQuery,
} = roadmapApiSlice as any;
