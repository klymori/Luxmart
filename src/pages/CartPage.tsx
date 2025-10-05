import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { updateQuantity, removeFromCart, clearCart } from '../features/cart/cartSlice'
import Button from '../components/ui/Button'
import { Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { toast } from 'react-hot-toast'

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, total, itemCount } = useAppSelector((state) => state.cart)

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId))
      toast.success('Товар удален из корзины')
    } else {
      dispatch(updateQuantity({ productId, quantity }))
    }
  }

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId))
    toast.success('Товар удален из корзины')
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.success('Корзина очищена')
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'KGS',
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Корзина пуста
          </h2>
          <p className="text-gray-600 mb-8">
            Добавьте товары в корзину, чтобы продолжить покупки
          </p>
          <Link to="/catalog">
            <Button>
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/catalog" className="text-primary-600 hover:text-primary-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Корзина ({itemCount} товаров)
          </h1>
        </div>
        
        <Button
          onClick={handleClearCart}
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Очистить корзину
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${JSON.stringify(item.selectedAttributes)}`} className="bg-white border rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0] || '/api/placeholder/100/100'}
                    alt={item.product.title.ru}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.product.title.ru}
                    </h3>
                    
                    {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                      <div className="text-sm text-gray-600 mb-2">
                        {Object.entries(item.selectedAttributes).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {value}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.product.price)}
                      </span>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Итого
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары ({itemCount})</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span className="font-medium text-green-600">Бесплатно</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to="/checkout" className="block">
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </Link>
              
              <Link to="/catalog" className="block">
                <Button variant="outline" className="w-full">
                  Продолжить покупки
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span>Безопасная оплата</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span>Быстрая доставка</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
