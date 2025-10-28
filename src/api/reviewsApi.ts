import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Review, PaginatedResponse } from '../types'

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/reviews',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getReviews: builder.query<PaginatedResponse<Review>, { productId: string; page?: number; limit?: number }>({
      query: ({ productId, page = 1, limit = 10 }) => ({
        url: '',
        params: { productId, page, limit },
      }),
      providesTags: (_result, _error, { productId }) => [{ type: 'Review', id: productId }],
    }),
    createReview: builder.mutation<Review, { productId: string; rating: number; text: string }>({
      query: (reviewData) => ({
        url: '',
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (_result, _error, { productId }) => [{ type: 'Review', id: productId }],
    }),
    updateReview: builder.mutation<Review, { id: string; rating: number; text: string }>({
      query: ({ id, ...reviewData }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: reviewData,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Review', id }],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Review', id }],
    }),
    moderateReview: builder.mutation<Review, { id: string; status: 'approved' | 'rejected' }>({
      query: ({ id, status }) => ({
        url: `/${id}/moderate`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Review', id }],
      // This should only be available for admin users
    }),
    getPendingReviews: builder.query<Review[], void>({
      query: () => '/pending',
      providesTags: ['Review'],
    }),
    getProductRating: builder.query<{ average: number; count: number }, string>({
      query: (productId) => `/rating/${productId}`,
    }),
  }),
})

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useModerateReviewMutation,
  useGetPendingReviewsQuery,
  useGetProductRatingQuery,
} = reviewsApi
