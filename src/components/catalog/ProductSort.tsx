import React from 'react'
import { ChevronDown } from 'lucide-react'

interface ProductSortProps {
  sortBy?: string
  sortOrder?: string
  onSortChange: (sortBy: string, sortOrder: string) => void
}

const ProductSort: React.FC<ProductSortProps> = ({
  sortBy = 'newest',
  sortOrder = 'desc',
  onSortChange
}) => {
  const sortOptions = [
    { value: 'newest', label: 'Сначала новые' },
    { value: 'price', label: 'По цене' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'popularity', label: 'По популярности' }
  ]

  const handleSortChange = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      // Toggle order if same sort option
      onSortChange(newSortBy, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      onSortChange(newSortBy, 'desc')
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Сортировка:</span>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
           className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      
      <button
        onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        title={sortOrder === 'asc' ? 'По убыванию' : 'По возрастанию'}
      >
        <svg
          className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      </button>
    </div>
  )
}

export default ProductSort
