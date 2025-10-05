import React from 'react'
import { Users, Target, Award, Heart } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            О компании Luxmart
          </h1>
          <p className="text-xl text-gray-600">
            Мы создаем будущее онлайн-торговли в Кыргызстане
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Наша миссия
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Luxmart стремится сделать качественные товары доступными для каждого жителя Кыргызстана. 
              Мы верим, что современные технологии должны служить людям и упрощать их жизнь.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Наша платформа объединяет лучших поставщиков, обеспечивая клиентам широкий выбор 
              качественных товаров по доступным ценам.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Наши ценности
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Качество</h3>
                  <p className="text-gray-600">Только проверенные товары от надежных поставщиков</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Надежность</h3>
                  <p className="text-gray-600">Быстрая доставка и гарантия качества</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Клиентоориентированность</h3>
                  <p className="text-gray-600">Мы всегда на связи и готовы помочь</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <Award className="w-16 h-16 text-primary-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Почему выбирают нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Широкий ассортимент</h3>
              <p className="text-gray-600">Тысячи товаров в различных категориях</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставка в течение 24 часов по всему городу</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Все товары проходят тщательную проверку</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
