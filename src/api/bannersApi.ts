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
      providesTags: (result, error, id) => [{ type: 'Banner', id }],
    }),
    createBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (banner) => ({
        url: '',
        method: 'POST',
        body: banner,
      }),
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation<Banner, { id: string; banner: Partial<Banner> }>({
      query: ({ id, banner }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: banner,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Banner', id }],
    }),
    deleteBanner: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Banner', id }],
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
      invalidatesTags: (result, error, { bannerId }) => [{ type: 'Banner', id: bannerId }],
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
