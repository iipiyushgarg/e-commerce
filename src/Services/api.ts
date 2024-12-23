import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorAlert } from "../Redux/AppSlice";
import { Post } from "../Features/Product-list";

interface ErrorResponse {
  error?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], unknown>({
      query: ({ limit, category }: { limit: number; category: string }) =>
        `products${category && "/category/" + category}?limit=${limit}`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (err: unknown) {
          if ((err as ErrorResponse)?.error?.status === 401) {
            dispatch(
              errorAlert({
                message:
                  (err as ErrorResponse)?.error?.data?.message ||
                  "Session expired, please sign in again!",
              })
            );
          } else if ((err as ErrorResponse)?.error) {
            dispatch(
              errorAlert({
                message:
                  (err as ErrorResponse)?.error?.data?.message ||
                  "Error loading data.",
              })
            );
          } else {
            dispatch(
              errorAlert({
                message: "An unexpected error occurred.",
              })
            );
          }
        }
      },
    }),
    getCategories: builder.query<string[], unknown>({
      query: () => `products/categories`,
    }),
  }),
});

export const { useGetPostsQuery, useGetCategoriesQuery } = dashboardApi;
