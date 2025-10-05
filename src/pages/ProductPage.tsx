import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductQuery } from '../api/productsApi'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { addToCart } from '../features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice'
import ProductGallery from '../components/products/ProductGallery'
import ProductInfo from '../components/products/ProductInfo'
import ProductReviews from '../components/products/ProductReviews'
import RelatedProducts from '../components/products/RelatedProducts'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  
  const dispatch = useAppDispatch()
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  
  const { data: product, isLoading, error } = useGetProductQuery(id!)
  
  const isInWishlist = product ? wishlistItems.some(item => item.id === product.id) : false

  const handleAddToCart = () => {
    if (!product) return
    
    dispatch(addToCart({ 
      product, 
      quantity,
      selectedAttributes: Object.keys(selectedAttributes).length > 0 ? selectedAttributes : undefined
    }))
    toast.success('Товар добавлен в корзину')
  }

  const handleToggleWishlist = () => {
    if (!product) return
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast.success('Товар удален из избранного')
    } else {
      dispatch(addToWishlist(product))
      toast.success('Товар добавлен в избранное')
    }
  }

  const handleAttributeChange = (attribute: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attribute]: value
    }))
  }

  if (isLoading) {
    return (
      <div className="w-full py-8">
        <div className="text-center max-w-7xl mx-auto px-2 sm:px-4">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="w-full py-8">
        <div className="text-center max-w-7xl mx-auto px-2 sm:px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Товар не найден</h2>
          <p className="text-gray-600">Запрашиваемый товар не существует или был удален</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Gallery */}
        <ProductGallery images={product.images} />
        
        {/* Product Info */}
        <ProductInfo
          product={product}
          selectedAttributes={selectedAttributes}
          onAttributeChange={handleAttributeChange}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={isInWishlist}
        />
      </div>

      {/* Product Reviews */}
      <ProductReviews productId={product.id} />

      {/* Related Products */}
      <RelatedProducts productId={product.id} category={product.categories?.[0] || ''} />
      </div>
    </div>
  )
}

export default ProductPage
