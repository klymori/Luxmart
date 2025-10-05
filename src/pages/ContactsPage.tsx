import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Globe } from 'lucide-react'

const ContactsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('navigation.contacts')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <Phone className="w-7 h-7 text-indigo-600 mr-3" />
                Контактная информация
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Телефон</h3>
                    <p className="text-indigo-600 font-medium text-lg">+996 502 062 868</p>
                    <p className="text-sm text-gray-500">Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 16:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
                    <p className="text-purple-600 font-medium text-lg">kaqqakat@gmail.com</p>
                    <p className="text-sm text-gray-500">Ответим в течение 24 часов</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Адрес</h3>
                    <p className="text-green-600 font-medium">г. Бишкек, ул. Токтогула, 123</p>
                    <p className="text-sm text-gray-500">Торговый центр "Luxmart Plaza"</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">Часы работы</h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">Пн-Пт: <span className="font-medium text-orange-600">9:00 - 18:00</span></p>
                      <p className="text-gray-600">Сб: <span className="font-medium text-orange-600">10:00 - 16:00</span></p>
                      <p className="text-gray-600">Вс: <span className="font-medium text-red-600">выходной</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-purple-600 mr-3" />
                Быстрая связь
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="tel:+996502062868" 
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">Позвонить</span>
                </a>
                
                <a 
                  href="mailto:kaqqakat@gmail.com" 
                  className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form & Map */}
          <div className="space-y-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Send className="w-7 h-7 text-indigo-600 mr-3" />
                Написать нам
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тема сообщения</label>
                  <input
                    type="text"
                    placeholder="О чем вы хотите написать?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea
                    rows={4}
                    placeholder="Расскажите подробнее о вашем вопросе..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                >
                  <Send className="w-5 h-5" />
                  <span>Отправить сообщение</span>
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Globe className="w-7 h-7 text-purple-600 mr-3" />
                Наше местоположение
              </h3>
              
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl h-64 flex items-center justify-center border border-indigo-200">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                  <p className="text-indigo-600 font-medium text-lg">Интерактивная карта</p>
                  <p className="text-sm text-indigo-500 mt-2">
                    г. Бишкек, ул. Токтогула, 123
                  </p>
                  <p className="text-xs text-indigo-400 mt-1">
                    Торговый центр "Luxmart Plaza"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Следите за нами в социальных сетях</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="text-lg font-bold">f</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="text-lg font-bold">@</span>
              </a>
              <a href="#" className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsPage
