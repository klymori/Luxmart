import React from 'react'
import { useGetProductsQuery } from '../../api/productsApi'
import ProductCard from './ProductCard'
import LoadingSpinner from '../ui/LoadingSpinner'

interface RelatedProductsProps {
  productId: string
  category: string
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  productId, 
  category 
}) => {
  const { data: products, isLoading, error } = useGetProductsQuery({
    filters: { category },
    page: 1,
    limit: 4
  })

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error || !products || products.data.length === 0) {
    return null
  }

  // Filter out current product
  const relatedProducts = products.data.filter(product => product.id !== productId)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="py-8 border-t">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Похожие товары
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
