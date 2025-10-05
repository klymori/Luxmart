import React from 'react'
import { FileText, Shield, Users, CreditCard } from 'lucide-react'

const LegalPage: React.FC = () => {
  const legalSections = [
    {
      title: "Пользовательское соглашение",
      icon: FileText,
      content: "Настоящее пользовательское соглашение регулирует отношения между Luxmart и пользователями нашего сайта. Используя наш сервис, вы соглашаетесь с условиями данного соглашения."
    },
    {
      title: "Политика конфиденциальности",
      icon: Shield,
      content: "Мы серьезно относимся к защите ваших персональных данных. Наша политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу информацию."
    },
    {
      title: "Условия доставки",
      icon: Users,
      content: "Условия доставки включают сроки, стоимость, зоны доставки и ответственность сторон. Доставка осуществляется в соответствии с действующим законодательством Кыргызской Республики."
    },
    {
      title: "Условия оплаты",
      icon: CreditCard,
      content: "Мы принимаем различные способы оплаты: банковские карты, наличные при получении, рассрочку. Все платежи защищены современными системами безопасности."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Правовая информация
          </h1>
          <p className="text-xl text-gray-600">
            Важные документы и условия использования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {legalSections.map((section, index) => {
            const Icon = section.icon
            return (
              <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Основные положения
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                1. Общие положения
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Luxmart - интернет-магазин, осуществляющий продажу товаров через интернет. 
                Все товары представлены в соответствии с их реальными характеристиками. 
                Мы оставляем за собой право изменять ассортимент и цены без предварительного уведомления.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                2. Права и обязанности сторон
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Покупатель имеет право на получение качественного товара в соответствии с описанием. 
                Продавец обязуется доставить товар в указанные сроки и в надлежащем состоянии.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                3. Возврат и обмен
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Возврат товара возможен в течение 14 дней с момента получения при сохранении 
                товарного вида и упаковки. Возврат денежных средств осуществляется в течение 10 рабочих дней.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                4. Ответственность
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Luxmart не несет ответственности за задержки доставки, вызванные форс-мажорными 
                обстоятельствами. В случае повреждения товара при транспортировке, мы заменим его бесплатно.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Если у вас есть вопросы по правовым аспектам, свяжитесь с нами:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:legal@luxmart.com"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              legal@luxmart.com
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

export default LegalPage
