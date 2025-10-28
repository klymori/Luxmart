import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PickupPoint } from '../types'

export const pickupApi = createApi({
  reducerPath: 'pickupApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/pickup-points',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['PickupPoint'],
  endpoints: (builder) => ({
    getPickupPoints: builder.query<PickupPoint[], void>({
      query: () => '',
      providesTags: ['PickupPoint'],
    }),
    getActivePickupPoints: builder.query<PickupPoint[], void>({
      query: () => '/active',
      providesTags: ['PickupPoint'],
    }),
    getPickupPoint: builder.query<PickupPoint, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'PickupPoint', id }], // исправлено TS6133
    }),
    createPickupPoint: builder.mutation<PickupPoint, Partial<PickupPoint>>({
      query: (pickupPoint) => ({
        url: '',
        method: 'POST',
        body: pickupPoint,
      }),
      invalidatesTags: ['PickupPoint'],
    }),
    updatePickupPoint: builder.mutation<PickupPoint, { id: string; pickupPoint: Partial<PickupPoint> }>({
      query: ({ id, pickupPoint }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: pickupPoint,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'PickupPoint', id }], // исправлено TS6133
    }),
    deletePickupPoint: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'PickupPoint', id }], // исправлено TS6133
    }),
    getNearestPickupPoints: builder.query<PickupPoint[], { lat: number; lng: number; radius?: number }>({
      query: ({ lat, lng, radius = 10 }) => ({
        url: '/nearest',
        params: { lat, lng, radius },
      }),
    }),
  }),
})

export const {
  useGetPickupPointsQuery,
  useGetActivePickupPointsQuery,
  useGetPickupPointQuery,
  useCreatePickupPointMutation,
  useUpdatePickupPointMutation,
  useDeletePickupPointMutation,
  useGetNearestPickupPointsQuery,
} = pickupApi
