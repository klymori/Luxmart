import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetProductsQuery } from '../api/productsApi'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/catalog/ProductFilters'
import ProductSort from '../components/catalog/ProductSort'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { SearchParams } from '../types'

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<SearchParams['filters']>({})
  const [page, setPage] = useState(1)

  // Parse URL parameters
  useEffect(() => {
    const newFilters: SearchParams['filters'] = {}
    
    if (searchParams.get('category')) {
      newFilters.category = searchParams.get('category')!
    }
    if (searchParams.get('minPrice')) {
      newFilters.minPrice = Number(searchParams.get('minPrice'))
    }
    if (searchParams.get('maxPrice')) {
      newFilters.maxPrice = Number(searchParams.get('maxPrice'))
    }
    if (searchParams.get('brand')) {
      newFilters.brand = searchParams.get('brand')!
    }
    if (searchParams.get('rating')) {
      newFilters.rating = Number(searchParams.get('rating'))
    }
    if (searchParams.get('inStock')) {
      newFilters.inStock = searchParams.get('inStock') === 'true'
    }
    if (searchParams.get('sortBy')) {
      newFilters.sortBy = searchParams.get('sortBy') as any
    }
    if (searchParams.get('sortOrder')) {
      newFilters.sortOrder = searchParams.get('sortOrder') as any
    }

    setFilters(newFilters)
  }, [searchParams])

  const searchParams_obj: SearchParams = {
    query: searchParams.get('q') || undefined,
    filters,
    page,
    limit: 12,
    sortBy: undefined,
    sortOrder: ''
  }

  const { data, isLoading, error } = useGetProductsQuery(searchParams_obj)

  const handleFilterChange = (newFilters: SearchParams['filters']) => {
    setFilters(newFilters)
    setPage(1)
    
    // Update URL
    const newSearchParams = new URLSearchParams(searchParams)
    Object.entries(newFilters ?? {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newSearchParams.set(key, String(value))
      } else {
        newSearchParams.delete(key)
      }
    })
    setSearchParams(newSearchParams)
  }

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    handleFilterChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ошибка загрузки</h2>
          <p className="text-gray-600">Попробуйте обновить страницу</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-2 sm:px-4">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Каталог товаров
              {data?.total && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({data.total} товаров)
                </span>
              )}
            </h1>
            
            <ProductSort
              sortBy={filters.sortBy}
              sortOrder={filters.sortOrder}
              onSortChange={handleSortChange}
            />
          </div>

          {data?.data && data.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {data.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-2">
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-3 py-2 rounded-md text-sm font-medium ${
                          pageNum === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Товары не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или фильтры
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CatalogPage
