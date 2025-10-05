import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { removeFromWishlist, clearWishlist } from '../features/wishlist/wishlistSlice'
import ProductCard from '../components/products/ProductCard'
import Button from '../components/ui/Button'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.wishlist)

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromWishlist(productId))
    toast.success('Товар удален из избранного')
  }

  const handleClearWishlist = () => {
    dispatch(clearWishlist())
    toast.success('Список избранного очищен')
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Список избранного пуст
          </h2>
          <p className="text-gray-600 mb-8">
            Добавьте товары в избранное, чтобы не потерять их
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
        <h1 className="text-3xl font-bold text-gray-900">
          Избранное ({items.length} товаров)
        </h1>
        
        <Button
          onClick={handleClearWishlist}
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Очистить список
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="relative group">
            <ProductCard product={product} />
            
            <button
              onClick={() => handleRemoveItem(product.id)}
              className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage
