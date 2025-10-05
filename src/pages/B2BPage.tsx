import React from 'react'
import { Building, Users, TrendingUp, Shield, CheckCircle } from 'lucide-react'

const B2BPage: React.FC = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Специальные цены",
      description: "Скидки до 30% для корпоративных клиентов"
    },
    {
      icon: Users,
      title: "Персональный менеджер",
      description: "Индивидуальное обслуживание и поддержка"
    },
    {
      icon: Shield,
      title: "Гарантии качества",
      description: "Сертифицированные товары с расширенной гарантией"
    },
    {
      icon: Building,
      title: "Корпоративные решения",
      description: "Комплексные поставки для вашего бизнеса"
    }
  ]

  const features = [
    "Бесплатная доставка от 50,000 сом",
    "Отсрочка платежа до 30 дней",
    "Персональные скидки и бонусы",
    "Приоритетная поддержка 24/7",
    "Гибкие условия оплаты",
    "Специальные условия для крупных заказов"
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Корпоративные решения
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Специальные условия для бизнеса: скидки, персональное обслуживание 
            и комплексные решения для вашей компании
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Преимущества для бизнеса
            </h2>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Стать корпоративным клиентом
            </h3>
            <p className="text-gray-600 mb-6">
              Заполните форму, и наш менеджер свяжется с вами для обсуждения 
              индивидуальных условий сотрудничества
            </p>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Название компании"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="text"
                placeholder="Контактное лицо"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <textarea
                rows={3}
                placeholder="Расскажите о ваших потребностях"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white border rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Наши корпоративные клиенты
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">Компания {item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-gray-600 mb-6">
            Свяжитесь с нами для получения персонального предложения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:b2b@luxmart.com"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              b2b@luxmart.com
            </a>
            <a
              href="tel:+996XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              +996 (XXX) XXX-XX-XX
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default B2BPage
