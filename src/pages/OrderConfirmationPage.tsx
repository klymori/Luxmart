import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react'

const OrderConfirmationPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Заказ успешно оформлен!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Спасибо за покупку! Мы отправили подтверждение на ваш email.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Что дальше?
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Package className="w-4 h-4 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Подготовка заказа</p>
                <p className="text-sm text-gray-600">Мы собираем ваш заказ</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Доставка</p>
                <p className="text-sm text-gray-600">Курьер доставит заказ</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Оплата</p>
                <p className="text-sm text-gray-600">Оплата при получении</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/orders">
            <Button size="lg">
              Мои заказы
            </Button>
          </Link>
          
          <Link to="/catalog">
            <Button variant="outline" size="lg">
              Продолжить покупки
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
