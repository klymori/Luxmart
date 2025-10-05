import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqItems = [
    {
      question: "Как оформить заказ?",
      answer: "Оформление заказа очень простое: выберите товары, добавьте их в корзину, перейдите к оформлению заказа, заполните данные для доставки и выберите способ оплаты. После подтверждения заказа вы получите уведомление на email."
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Мы принимаем оплату банковскими картами, наличными при получении, а также предоставляем рассрочку без переплат. Все платежи защищены современными системами безопасности."
    },
    {
      question: "Сколько времени занимает доставка?",
      answer: "Стандартная доставка по городу составляет 24 часа. Для отдаленных районов срок может увеличиться до 2-3 дней. Вы можете выбрать самовывоз из наших пунктов выдачи."
    },
    {
      question: "Можно ли вернуть товар?",
      answer: "Да, вы можете вернуть товар в течение 14 дней с момента получения, если он не был в использовании и сохранил товарный вид. Возврат осуществляется бесплатно."
    },
    {
      question: "Есть ли гарантия на товары?",
      answer: "Все товары имеют официальную гарантию производителя. Срок гарантии зависит от типа товара и составляет от 6 месяцев до 2 лет. Мы также предоставляем дополнительную гарантию качества."
    },
    {
      question: "Как отследить заказ?",
      answer: "После отправки заказа вы получите трек-номер для отслеживания. Вы можете отслеживать статус заказа в личном кабинете или связаться с нашей службой поддержки."
    },
    {
      question: "Работает ли служба поддержки в выходные?",
      answer: "Наша служба поддержки работает круглосуточно, 7 дней в неделю. Вы можете связаться с нами через онлайн-чат, телефон или email в любое время."
    },
    {
      question: "Предоставляете ли вы рассрочку?",
      answer: "Да, мы предоставляем рассрочку без переплат на срок от 3 до 12 месяцев. Условия рассрочки зависят от суммы покупки и выбранного товара."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-xl text-gray-600">
            Нашли ответы на самые популярные вопросы
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-sm">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-gray-600 mb-6">
            Свяжитесь с нашей службой поддержки, и мы обязательно поможем
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+996XXXXXXXXX"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Позвонить нам
            </a>
            <a
              href="mailto:support@luxmart.com"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Написать email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQPage
