import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { useCreateOrderMutation } from '../api/ordersApi'
import { clearCart } from '../features/cart/cartSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { CheckoutForm, Address } from '../types'
import { toast } from 'react-hot-toast'
import { ArrowLeft, MapPin, CreditCard, Truck } from 'lucide-react'

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.auth)
  
  const [createOrder, { isLoading }] = useCreateOrderMutation()
  
  const [formData, setFormData] = useState<CheckoutForm>({
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'Кыргызстан',
      apartment: '',
      floor: '',
      entrance: ''
    },
    deliveryMethod: 'pickup',
    paymentMethod: 'card',
    notes: ''
  })

  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1] as keyof Address
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Необходимо войти в систему')
      navigate('/login')
      return
    }

    if (items.length === 0) {
      toast.error('Корзина пуста')
      navigate('/cart')
      return
    }

    try {
      await createOrder(formData).unwrap()
      dispatch(clearCart())
      toast.success('Заказ успешно оформлен!')
      navigate('/order-confirmation')
    } catch (error) {
      toast.error('Ошибка при оформлении заказа')
    }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Корзина пуста
          </h2>
          <p className="text-gray-600 mb-8">
            Добавьте товары в корзину, чтобы оформить заказ
          </p>
          <Button onClick={() => navigate('/catalog')}>
            Перейти в каталог
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="text-primary-600 hover:text-primary-700 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Оформление заказа
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Delivery Address */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Адрес доставки
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Input
                  label="Улица и дом"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  required
                />
              </div>
              
              <Input
                label="Квартира"
                value={formData.address.apartment}
                onChange={(e) => handleInputChange('address.apartment', e.target.value)}
              />
              
              <Input
                label="Этаж"
                value={formData.address.floor}
                onChange={(e) => handleInputChange('address.floor', e.target.value)}
              />
              
              <Input
                label="Подъезд"
                value={formData.address.entrance}
                onChange={(e) => handleInputChange('address.entrance', e.target.value)}
              />
              
              <Input
                label="Город"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                required
              />
              
              <Input
                label="Почтовый индекс"
                value={formData.address.postalCode}
                onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Способ доставки
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={formData.deliveryMethod === 'pickup'}
                  onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Самовывоз</div>
                  <div className="text-sm text-gray-600">Бесплатно</div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="courier"
                  checked={formData.deliveryMethod === 'courier'}
                  onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Курьерская доставка</div>
                  <div className="text-sm text-gray-600">200 сом</div>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Способ оплаты
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Банковская карта</div>
                  <div className="text-sm text-gray-600">Оплата при получении</div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Наличными</div>
                  <div className="text-sm text-gray-600">Оплата при получении</div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="installment"
                  checked={formData.paymentMethod === 'installment'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Рассрочка</div>
                  <div className="text-sm text-gray-600">Без переплат</div>
                </div>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Комментарий к заказу
            </h2>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Дополнительная информация для курьера..."
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-4">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ваш заказ
            </h3>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <img
                    src={item.product.images[0] || '/api/placeholder/60/60'}
                    alt={item.product.title.ru}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {item.product.title.ru}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {item.quantity} шт. × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span className="text-green-600">
                  {formData.deliveryMethod === 'pickup' ? 'Бесплатно' : '200 сом'}
                </span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span>
                    {formatPrice(total + (formData.deliveryMethod === 'courier' ? 200 : 0))}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-6"
              size="lg"
            >
              Оформить заказ
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
