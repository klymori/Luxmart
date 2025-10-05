import React from 'react'
import { Link } from 'react-router-dom'
import { useGetSaleProductsQuery } from '../../api/productsApi'
import ProductCard from '../products/ProductCard'
import LoadingSpinner from '../ui/LoadingSpinner'

const SaleProducts: React.FC = () => {
  const { data: products, isLoading, error } = useGetSaleProductsQuery()

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (error || !products || products.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Товары со скидкой
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Не упустите возможность сэкономить на качественных товарах
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/catalog?sale=true"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Посмотреть все товары со скидкой
        </Link>
      </div>
    </section>
  )
}

export default SaleProducts
