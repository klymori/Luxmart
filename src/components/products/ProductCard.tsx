import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToCart } from '../../features/cart/cartSlice'
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice'
import { Product } from '../../types'
import Button from '../ui/Button'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  showQuickView?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showQuickView = true 
}) => {
  const dispatch = useAppDispatch()
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist)
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
    toast.success('Товар добавлен в корзину')
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
      toast.success('Товар удален из избранного')
    } else {
      dispatch(addToWishlist(product))
      toast.success('Товар добавлен в избранное')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KGS',
    }).format(price)
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative">
          <img
            src={product.images[0] || '/api/placeholder/300/300'}
            alt={product.title.ru}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Новинка
              </span>
            )}
            {product.isOnSale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Скидка
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Рекомендуем
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isInWishlist 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            
            {showQuickView && (
              <button className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors text-sm sm:text-base">
            {product.title.ru}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviewsCount})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-base sm:text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            
            {product.stock > 0 ? (
              <span className="text-sm text-green-600 font-medium">
                В наличии
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">
                Нет в наличии
              </span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
