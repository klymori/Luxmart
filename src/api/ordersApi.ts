import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Order, CheckoutForm, PaginatedResponse } from '../types'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/orders',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedResponse<Order>, { page?: number; limit?: number; status?: string }>(
      {
        query: (params) => ({
          url: '',
          params,
        }),
        providesTags: ['Order'],
      }
    ),
    getOrder: builder.query<Order, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }], // исправлено TS6133
    }),
    createOrder: builder.mutation<Order, CheckoutForm>({
      query: (orderData) => ({
        url: '',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: string; trackingNumber?: string }>({
      query: ({ id, status, trackingNumber }) => ({
        url: `/${id}/status`,
        method: 'PUT',
        body: { status, trackingNumber },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Order', id }], // исправлено TS6133
    }),
    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Order', id }], // исправлено TS6133
    }),
    getOrderHistory: builder.query<Order[], void>({
      query: () => '/history',
      providesTags: ['Order'],
    }),
    trackOrder: builder.query<{ status: string; trackingNumber?: string; location?: string }, string>({
      query: (id) => `/${id}/track`,
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useGetOrderHistoryQuery,
  useTrackOrderQuery,
} = ordersApi
