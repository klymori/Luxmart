import React, { useState } from 'react'
import { useGetReviewsQuery, useCreateReviewMutation } from '../../api/reviewsApi'
import { useAppSelector } from '../../hooks/redux'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Star, User } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProductReviewsProps {
  productId: string
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  
  const { data: reviewsData, isLoading } = useGetReviewsQuery({ 
    productId, 
    page: 1, 
    limit: 10 
  })
  
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation()

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Необходимо войти в систему')
      return
    }
    
    if (rating === 0) {
      toast.error('Пожалуйста, выберите рейтинг')
      return
    }
    
    if (!reviewText.trim()) {
      toast.error('Пожалуйста, напишите отзыв')
      return
    }

    try {
      await createReview({
        productId,
        rating,
        text: reviewText.trim()
      }).unwrap()
      
      toast.success('Отзыв отправлен на модерацию')
      setShowReviewForm(false)
      setRating(0)
      setReviewText('')
    } catch (error) {
      toast.error('Ошибка при отправке отзыва')
    }
  }

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  const reviews = reviewsData?.data || []

  return (
    <div className="py-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Отзывы ({reviews.length})
        </h3>
        
        {isAuthenticated && (
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            variant="outline"
          >
            {showReviewForm ? 'Отменить' : 'Написать отзыв'}
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Оставить отзыв
          </h4>
          
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Рейтинг
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Отзыв
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Поделитесь своим мнением о товаре..."
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                Отменить
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                Отправить отзыв
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white border rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {review.user.name}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Пока нет отзывов</p>
          {!isAuthenticated && (
            <p className="text-sm text-gray-400 mt-2">
              Войдите в систему, чтобы оставить первый отзыв
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductReviews
