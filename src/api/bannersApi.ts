import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Banner } from '../types'

export const bannersApi = createApi({
  reducerPath: 'bannersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/banners',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Banner'],
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], void>({
      query: () => '',
      providesTags: ['Banner'],
    }),
    getActiveBanners: builder.query<Banner[], void>({
      query: () => '/active',
      providesTags: ['Banner'],
    }),
    getBanner: builder.query<Banner, string>({
  query: (id) => `/${id}`,
  providesTags: (_result, _error, id) => [{ type: 'Banner', id }],
}),
    createBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: '',
        method: 'POST',
        body: banner,
      }),
      invalidatesTags: ['Banner'], // больше не используем result/error
    }),
    updateBanner: builder.mutation<Banner, { id: string; banner: Partial<Banner> }>({
      query: ({ id, banner }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: banner,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Banner', id }], // TS6133 исправлено через _
    }),
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Banner', id }], // TS6133 исправлено через _
    }),
    updateBannerOrder: builder.mutation<Banner[], { banners: Array<{ id: string; order: number }> }>({
      query: ({ banners }) => ({
        url: '/reorder',
        method: 'PUT',
        body: { banners },
      }),
      invalidatesTags: ['Banner'],
    }),
    uploadBannerImage: builder.mutation<{ url: string }, { bannerId: string; file: File }>({
      query: ({ bannerId, file }) => {
        const formData = new FormData()
        formData.append('image', file)
        return {
          url: `/${bannerId}/image`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: (_result, _error, { bannerId }) => [{ type: 'Banner', id: bannerId }], // TS6133 исправлено через _
    }),
  }),
})

export const {
  useGetBannersQuery,
  useGetActiveBannersQuery,
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerOrderMutation,
  useUploadBannerImageMutation,
} = bannersApi
