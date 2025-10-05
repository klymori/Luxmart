import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product, Category, SearchParams, PaginatedResponse } from '../types'
import { sampleProducts } from '../data/sampleProducts'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/products',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, SearchParams>({
      queryFn: async (params) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        let filteredProducts = [...sampleProducts]
        
        // Apply search filter
        if (params.query) {
          const searchTerm = params.query.toLowerCase()
          filteredProducts = filteredProducts.filter(product => 
            product.title.ru.toLowerCase().includes(searchTerm) ||
            product.description.ru.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
          )
        }
        
        // Apply category filter
        if (params.filters?.category) {
          filteredProducts = filteredProducts.filter(product => 
            product.category === params.filters.category
          )
        }
        
        // Apply price filter
        if (params.filters?.minPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price >= params.filters.minPrice!
          )
        }
        if (params.filters?.maxPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price <= params.filters.maxPrice!
          )
        }
        
        // Apply sorting
        if (params.sortBy) {
          filteredProducts.sort((a, b) => {
            switch (params.sortBy) {
              case 'price':
                return params.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
              case 'rating':
                return params.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
              case 'newest':
                return params.sortOrder === 'asc' ? 1 : -1
              default:
                return 0
            }
          })
        }
        
        // Pagination
        const page = params.page || 1
        const limit = params.limit || 12
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
        
        return {
          data: {
            data: paginatedProducts,
            total: filteredProducts.length,
            page,
            limit,
            totalPages: Math.ceil(filteredProducts.length / limit)
          }
        }
      },
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      queryFn: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const product = sampleProducts.find(p => p.id === id)
        if (!product) {
          return { error: { status: 404, data: 'Product not found' } }
        }
        return { data: product }
      },
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getFeaturedProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const featured = sampleProducts.filter(p => p.isFeatured)
        return { data: featured }
      },
      providesTags: ['Product'],
    }),
    getNewProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const newProducts = sampleProducts.filter(p => p.isNew)
        return { data: newProducts }
      },
      providesTags: ['Product'],
    }),
    getSaleProducts: builder.query<Product[], void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const saleProducts = sampleProducts.filter(p => p.isOnSale)
        return { data: saleProducts }
      },
      providesTags: ['Product'],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories',
      providesTags: ['Category'],
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, { id: string; product: Partial<Product> }>({
      query: ({ id, product }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    uploadProductImages: builder.mutation<{ urls: string[] }, { productId: string; files: File[] }>({
      query: ({ productId, files }) => {
        const formData = new FormData()
        files.forEach(file => formData.append('images', file))
        return {
          url: `/${productId}/images`,
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
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
