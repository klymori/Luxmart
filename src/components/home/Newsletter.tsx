import React, { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { Mail, Send } from 'lucide-react'
import { toast } from 'react-hot-toast'

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Пожалуйста, введите email')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail('')
      toast.success('Спасибо за подписку!')
    }, 1000)
  }

  return (
    <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Подпишитесь на рассылку
          </h2>
          <p className="text-lg text-gray-100 mb-8">
            Получайте первыми информацию о новых товарах, скидках и специальных предложениях
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Введите ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              <Send className="w-4 h-4 mr-2" />
              Подписаться
            </Button>
          </form>

          <p className="text-sm text-gray-200 mt-4">
            Мы не спамим. Отписаться можно в любое время.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
