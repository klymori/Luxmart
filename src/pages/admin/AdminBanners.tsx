import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { useGetBannersQuery, useDeleteBannerMutation } from '../../api/bannersApi'
import Button from '../../components/ui/Button'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { Plus, Edit, Trash2, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'

const AdminBanners: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [showModal, setShowModal] = useState(false)
  
  const { data: banners, isLoading } = useGetBannersQuery()
  const [deleteBanner] = useDeleteBannerMutation()

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Доступ запрещен
          </h2>
          <p className="text-gray-600">
            У вас нет прав для доступа к админ-панели
          </p>
        </div>
      </div>
    )
  }

  const handleDeleteBanner = async (bannerId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот баннер?')) {
      try {
        await deleteBanner(bannerId).unwrap()
      } catch (error) {
        console.error('Error deleting banner:', error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Управление баннерами
          </h1>
          <p className="text-gray-600">
            Создавайте и управляйте рекламными баннерами
          </p>
        </div>
        
        <Button 
          onClick={() => setShowModal(true)}
          className="flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить баннер
        </Button>
      </div>

      {/* Banners Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners?.map((banner) => (
            <div key={banner.id} className="bg-white border rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={banner.imageUrl}
                  alt={banner.title || 'Баннер'}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    banner.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {banner.active ? 'Активен' : 'Неактивен'}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {banner.title || 'Без названия'}
                </h3>
                
                {banner.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {banner.description}
                  </p>
                )}
                
                {banner.link && (
                  <p className="text-sm text-primary-600 mb-3">
                    Ссылка: {banner.link}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Порядок: {banner.order}
                  </span>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Изменить
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {banners && banners.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Нет баннеров
          </h3>
          <p className="text-gray-600 mb-6">
            Создайте первый баннер для отображения на сайте
          </p>
          <Button onClick={() => setShowModal(true)}>
            Создать баннер
          </Button>
        </div>
      )}

      {/* Banner Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Создать баннер
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ссылка
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
                  Активный баннер
                </label>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">
                  Создать
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBanners
