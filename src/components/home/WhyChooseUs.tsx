import React from 'react'
import { Truck, Shield, Clock, Headphones, RotateCcw, Award } from 'lucide-react'

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'Быстрая доставка',
      description: 'Доставляем заказы в течение 24 часов по всему городу'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Все товары проходят тщательную проверку перед отправкой'
    },
    {
      icon: Clock,
      title: 'Круглосуточная поддержка',
      description: 'Наша служба поддержки работает 24/7 для вашего удобства'
    },
    {
      icon: Headphones,
      title: 'Профессиональная консультация',
      description: 'Наши эксперты помогут выбрать идеальный товар'
    },
    {
      icon: RotateCcw,
      title: 'Легкий возврат',
      description: 'Возврат товара в течение 14 дней без лишних вопросов'
    },
    {
      icon: Award,
      title: 'Проверенные бренды',
      description: 'Работаем только с официальными поставщиками'
    }
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы стремимся предоставить лучший сервис и качественные товары
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
