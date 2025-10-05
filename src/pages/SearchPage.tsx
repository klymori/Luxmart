import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetProductsQuery } from '../api/productsApi'
import ProductCard from '../components/products/ProductCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Search } from 'lucide-react'

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  
  const { data, isLoading, error } = useGetProductsQuery({
    query,
    page: 1,
    limit: 20
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchParams({ q: query.trim() })
    }
  }

  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      setQuery(searchQuery)
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск товаров..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {query && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Результаты поиска
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Поиск...' : 
             data ? `Найдено ${data.pagination.total} товаров по запросу "${query}"` :
             'Поиск не выполнен'}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ошибка поиска
          </h2>
          <p className="text-gray-600">
            Попробуйте изменить поисковый запрос
          </p>
        </div>
      ) : data && data.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ничего не найдено
          </h2>
          <p className="text-gray-600 mb-8">
            Попробуйте изменить поисковый запрос или использовать фильтры
          </p>
          <button
            onClick={() => setQuery('')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Очистить поиск
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Поиск товаров
          </h2>
          <p className="text-gray-600">
            Введите поисковый запрос в поле выше
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
