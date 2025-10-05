import React from 'react'
import { Link } from 'react-router-dom'
import { useGetCategoriesQuery } from '../../api/productsApi'
import LoadingSpinner from '../ui/LoadingSpinner'
import { Smartphone, Laptop, Headphones, Camera, Watch, Gamepad2 } from 'lucide-react'

const CategoriesSection: React.FC = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery()

  const categoryIcons = {
    'phones': Smartphone,
    'laptops': Laptop,
    'audio': Headphones,
    'cameras': Camera,
    'watches': Watch,
    'gaming': Gamepad2,
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </section>
    )
  }

  if (error || !categories || categories.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Популярные категории
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Выберите интересующую вас категорию и найдите идеальный товар
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.slice(0, 6).map((category) => {
          const Icon = categoryIcons[category.slug as keyof typeof categoryIcons] || Smartphone
          
          return (
            <Link
              key={category.id}
              to={`/catalog/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300 group-hover:border-primary-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {category.name.ru}
                  </h3>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/catalog"
          className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Посмотреть все категории
        </Link>
      </div>
    </section>
  )
}

export default CategoriesSection
