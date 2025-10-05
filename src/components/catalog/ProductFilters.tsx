import React from 'react'
import { useGetCategoriesQuery } from '../../api/productsApi'
import { SearchFilters } from '../../types'
import { cn } from '../../utils/cn'

interface ProductFiltersProps {
  filters: SearchFilters
  onFilterChange: (filters: SearchFilters) => void
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange
}) => {
  const { data: categories } = useGetCategoriesQuery()

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== null && value !== ''
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Фильтры</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Очистить все
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Цена</h4>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="От"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              className="input text-sm"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              className="input text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Категории</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={filters.category === category.slug}
                    onChange={(e) => handleFilterChange('category', e.target.checked ? category.slug : undefined)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{category.name.ru}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Рейтинг</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => handleFilterChange('rating', e.target.checked ? rating : undefined)}
                  className="mr-2"
                />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < rating ? 'text-yellow-400' : 'text-gray-300'
                      )}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c-.3-.921-1.603-.921-1.902 0L7.1 4.1 4.3 4.9c-.832.2-1.164.99-.832 1.6l1.4 2.4-1.4 2.4c-.332.61 0 1.4.832 1.6l2.8.8.8 2.8c.3.921 1.603.921 1.902 0l.8-2.8 2.8-.8c.832-.2 1.164-.99.832-1.6l-1.4-2.4 1.4-2.4c.332-.61 0-1.4-.832-1.6l-2.8-.8-.8-2.8z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-700 ml-1">и выше</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Наличие</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => handleFilterChange('inStock', e.target.checked || undefined)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Только в наличии</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
