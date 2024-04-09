import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE",
      }),
    }),
    getAllCategories: builder.query({
      query: () => `/api/category/`,
    }),
  }),
});

export const { useDeleteCategoryMutation, useGetAllCategoriesQuery } =
  categoryApiSlice;
