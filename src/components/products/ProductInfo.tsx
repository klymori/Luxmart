import React from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { addToCart } from '../../features/cart/cartSlice'
import { Product } from '../../types'
import Button from '../ui/Button'
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react'

interface ProductInfoProps {
  product: Product
  selectedAttributes: Record<string, string>
  onAttributeChange: (attribute: string, value: string) => void
  quantity: number
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
  onToggleWishlist: () => void
  isInWishlist: boolean
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  selectedAttributes,
  onAttributeChange,
  quantity,
  onQuantityChange,
  onAddToCart,
  onToggleWishlist,
  isInWishlist
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KGS',
    }).format(price)
  }

  const calculateDiscount = () => {
    if (!product.oldPrice) return 0
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
  }

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title.ru}
        </h1>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewsCount} отзывов)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <>
            <span className="text-xl text-gray-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
            <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
              -{calculateDiscount()}%
            </span>
          </>
        )}
      </div>

      {/* Attributes */}
      {Object.keys(product.attributes).length > 0 && (
        <div className="space-y-4">
          {Object.entries(product.attributes).map(([key, values]) => (
            <div key={key}>
              <h4 className="font-medium text-gray-900 mb-2 capitalize">
                {key}:
              </h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(values) ? values.map((value) => (
                  <button
                    key={value}
                    onClick={() => onAttributeChange(key, value)}
                    className={`px-3 py-1 rounded-md text-sm border transition-colors ${
                      selectedAttributes[key] === value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {value}
                  </button>
                )) : (
                  <span className="text-sm text-gray-600">{values}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Количество:</h4>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            -
          </button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(Math.min(product.stock, quantity + 1))}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          В наличии: {product.stock} шт.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onAddToCart}
          disabled={product.stock === 0}
          className="flex-1"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {product.stock > 0 ? 'В корзину' : 'Нет в наличии'}
        </Button>
        
        <Button
          onClick={onToggleWishlist}
          variant={isInWishlist ? 'primary' : 'outline'}
          size="lg"
          className="px-6"
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex items-center space-x-3">
          <Truck className="w-5 h-5 text-primary-600" />
          <div>
            <p className="font-medium text-gray-900">Быстрая доставка</p>
            <p className="text-sm text-gray-600">До 24 часов</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-primary-600" />
          <div>
            <p className="font-medium text-gray-900">Гарантия</p>
            <p className="text-sm text-gray-600">12 месяцев</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <RotateCcw className="w-5 h-5 text-primary-600" />
          <div>
            <p className="font-medium text-gray-900">Возврат</p>
            <p className="text-sm text-gray-600">14 дней</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Описание</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description.ru}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
