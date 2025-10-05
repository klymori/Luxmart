import React from 'react'
import { Link } from 'react-router-dom'
import { useGetFeaturedProductsQuery } from '../../api/productsApi'
import ProductCard from '../products/ProductCard'
import LoadingSpinner from '../ui/LoadingSpinner'

const FeaturedProducts: React.FC = () => {
  const { data: products, isLoading, error } = useGetFeaturedProductsQuery()

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
    <section className="w-full py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Рекомендуемые товары
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Лучшие товары, отобранные нашими экспертами
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/catalog?featured=true"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Посмотреть все рекомендуемые товары
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
