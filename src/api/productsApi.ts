import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, Category, SearchParams, PaginatedResponse } from '../types'
import { sampleProducts } from '../data/sampleProducts'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth?: { token?: string } }).auth?.token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, SearchParams>({
      queryFn: async (params) => {
        try {
          const safeParams = params || {}
          await new Promise((resolve) => setTimeout(resolve, 500))

          let filteredProducts = [...sampleProducts]

          // Поиск
          if (safeParams.query) {
            const term = safeParams.query.toLowerCase()
            filteredProducts = filteredProducts.filter(
              (p) =>
                p.title.ru.toLowerCase().includes(term) ||
                p.description.ru.toLowerCase().includes(term) ||
                p.brand.toLowerCase().includes(term)
            )
          }

          // Фильтры
          const filters = safeParams.filters || {}
          if (filters.category) filteredProducts = filteredProducts.filter((p) => p.category === filters.category)
          if (filters.minPrice != null) filteredProducts = filteredProducts.filter((p) => p.price >= filters.minPrice)
          if (filters.maxPrice != null) filteredProducts = filteredProducts.filter((p) => p.price <= filters.maxPrice)

          // Сортировка
          const sortBy = safeParams.sortBy
          const sortOrder = safeParams.sortOrder || 'asc'
          if (sortBy) {
            filteredProducts.sort((a, b) => {
              switch (sortBy) {
                case 'price':
                  return sortOrder === 'asc' ? a.price - b.price : b.price - a.price
                case 'rating':
                  return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
                case 'newest':
                  // Предполагается, что есть поле createdAt типа Date или string
                  if (a.createdAt && b.createdAt) {
                    return sortOrder === 'asc'
                      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                  }
                  return 0
                default:
                  return 0
              }
            })
          }

          // Пагинация
          const page = safeParams.page || 1
          const limit = safeParams.limit || 12
          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit
          const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

          return {
            data: {
              data: paginatedProducts,
              total: filteredProducts.length,
              page,
              limit,
              totalPages: Math.ceil(filteredProducts.length / limit),
            },
          } as const
        } catch (err) {
          return { error: { status: 500, data: (err as Error).message } }
        }
      },
      providesTags: (result) =>
        result && result.length > 0
          ? result.map((product) => ({ type: 'Product' as const, id: product.id }))
          : [{ type: 'Product' }],
    }),

    getProduct: builder.query<Product, string>({
      queryFn: async (id) => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 300))
          const product = sampleProducts.find((p) => p.id === id)
          if (!product) return { error: { status: 404, data: 'Product not found' } }
          return { data: product } as const
        } catch (err) {
          return { error: { status: 500, data: (err as Error).message } }
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    getFeaturedProducts: builder.query<Product[], void>({
      queryFn: async () => ({ data: sampleProducts.filter((p) => p.isFeatured) } as const),
      providesTags: (result) =>
        result
          ? result.map((product) => ({ type: 'Product' as const, id: product.id }))
          : [{ type: 'Product' }],
    }),

    getNewProducts: builder.query<Product[], void>({
      queryFn: async () => ({ data: sampleProducts.filter((p) => p.isNew) } as const),
      providesTags: (result) =>
        result
          ? result.map((product) => ({ type: 'Product' as const, id: product.id }))
          : [{ type: 'Product' }],
    }),

    getSaleProducts: builder.query<Product[], void>({
      queryFn: async () => ({ data: sampleProducts.filter((p) => p.isOnSale) } as const),
      providesTags: (result) =>
        result
          ? result.map((product: { id: any }) => ({ type: 'Product' as const, id: product.id }))
          : [{ type: 'Product' }],
    }),

    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: (result) =>
        result
          ? result.map((category) => ({ type: 'Category' as const, id: category.id }))
          : [{ type: 'Category' }],
    }),

    getCategory: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),

    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({ url: '', method: 'POST', body: product }),
      invalidatesTags: [{ type: 'Product' }],
    }),

    updateProduct: builder.mutation<Product, { id: string; product: Partial<Product> }>({
      query: ({ id, product }) => ({ url: `/${id}`, method: 'PUT', body: product }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Product', id }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({ url: `/${id}`, method: 'DELETE' }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    uploadProductImages: builder.mutation<{ urls: string[] }, { productId: string; files: File[] }>({
      query: ({ productId, files }) => {
        const formData = new FormData()
        files.forEach((f) => formData.append('images', f))
        return { url: `/${productId}/images`, method: 'POST', body: formData }
      },
      invalidatesTags: (_result, _error, { productId }) => [{ type: 'Product', id: productId }],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetFeaturedProductsQuery,
  useGetNewProductsQuery,
  useGetSaleProductsQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImagesMutation,
} = productsApi