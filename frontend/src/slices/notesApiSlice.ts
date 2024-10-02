import { apiSlice } from "./apiSlice";
import { NOTES_URL } from "../utils/constants";
import { CreateNoteProps, UpdateNoteProps } from "../utils/types";

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation<void, CreateNoteProps>({
      query: (data) => ({
        url: `${NOTES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getNotes: builder.query({
      query: () => ({
        url: `${NOTES_URL}`,
        method: "GET",
      }),
      providesTags: ["Notes"],
    }),
    updateNote: builder.mutation<void, UpdateNoteProps>({
      query: ({ id, color }) => ({
        url: `${NOTES_URL}/${id}`,
        method: "PUT",
        body: { color },
      }),
    }),
    deleteNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `${NOTES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useGetNotesQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice as any;
